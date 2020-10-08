/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

/* Amplify Params - DO NOT EDIT
	ENV
	REGION
    AUTH_AMPLIFYIDENTITYBROKERAUTH_USERPOOLID
	STORAGE_AMPLIFYIDENTITYBROKERCODESTABLE_ARN
	STORAGE_AMPLIFYIDENTITYBROKERCODESTABLE_NAME
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const CODE_LIFE = 600000; // How long in milliseconds the authorization code can be used to retrieve the tokens from the table (10 minutes)
const RECORD_LIFE = 900000; // How long in milliseconds the record lasts in the dynamoDB table (15 minutes)
const jwt_decode = require('jwt-decode');

var kmsClient = new AWS.KMS();
var keyIdAlias = "alias/amplifyIdentityBrokerTokenStorageKey-" + process.env.ENV;

var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

var docClient = new AWS.DynamoDB.DocumentClient();
var codesTableName = process.env.STORAGE_AMPLIFYIDENTITYBROKERCODESTABLE_NAME;

async function encryptToken(token) {
    var params = {
        KeyId: keyIdAlias,
        Plaintext: token
    };
    return new Promise(function (resolve, reject) {
        kmsClient.encrypt(params, function (err, data) {
            if (err) {
                console.error(err, err.stack);
                reject(err);
            }
            else {
                // Encryption has been successful
                var encryptedToken = data.CiphertextBlob;
                resolve(encryptedToken);
            }
        });
    });
}

async function getCookiesFromHeader(headers) {
    if (headers === null || headers === undefined || headers.Cookie === undefined) {
        return {};
    }

    var list = {},
        rc = headers.Cookie;

    rc && rc.split(';').forEach(function (cookie) {
        var parts = cookie.split('=');
        var key = parts.shift().trim();
        var value = decodeURI(parts.join('='));
        if (key != '') {
            list[key] = value;
        }
    });

    return list;
}

async function verifyClient(client_id, redirect_uri) {
    var data;
    var params = {
        ClientId: client_id,
        UserPoolId: process.env.AUTH_AMPLIFYIDENTITYBROKERAUTH_USERPOOLID
    };

    try {
        data = await cognitoidentityserviceprovider.describeUserPoolClient(params).promise();
        if (data.UserPoolClient && data.UserPoolClient.CallbackURLs) {
            for (var i = 0; i < data.UserPoolClient.CallbackURLs.length; i++) {
                if(data.UserPoolClient.CallbackURLs[i] === redirect_uri) { // If we have a URL that match it is a success
                    return true;
                }
            };
        }
    } catch (error) {
        console.error(error); // Most probable reason, the client_id doesn't exist in the Cognito user pool
    }

    return false;
}

async function asyncAuthenticateUser(cognitoUser, cognitoAuthenticationDetails) {
    return new Promise(function(resolve, reject) {
      cognitoUser.authenticateUser(cognitoAuthenticationDetails, {
        onSuccess: resolve,
        onFailure: reject,
        customChallenge: reject // We should not need an additionnal challenge: see DefineAuthChallenge implementation
      })
    })
  }

async function handlePKCE(event) {
    var client_id = event.queryStringParameters.client_id;
    var redirect_uri = event.queryStringParameters.redirect_uri;
    var code_challenge = event.queryStringParameters.code_challenge;
    var code_challenge_method = event.queryStringParameters.code_challenge_method;
    if (client_id === undefined || redirect_uri === undefined || code_challenge === undefined || code_challenge_method === undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify("Required parameters are missing"),
        };
    }

    // Verify client and redirect_uri against clients table
    var validClient = await verifyClient(client_id, redirect_uri);
    if (!validClient) {
        return {
            statusCode: 400,
            body: JSON.stringify("Invalid Client"),
        };
    }

    const authorizationCode = uuidv4();
    const currentTime = Date.now();
    const codeExpiry = currentTime + CODE_LIFE;
    const recordExpiry = Math.floor((currentTime + RECORD_LIFE) / 1000); // TTL must be in seconds
    var params = {
        TableName: codesTableName,
        Item: {
            authorization_code: authorizationCode,
            code_challenge: code_challenge,
            client_id: client_id,
            redirect_uri: redirect_uri,
            code_expiry: codeExpiry,
            record_expiry: recordExpiry
        }
    };

    var cookies = await getCookiesFromHeader(event.headers);
    var canReturnTokensDirectly = cookies.id_token && cookies.access_token && cookies.refresh_token ? true : false; // If there are already token cookies we can return the tokens directly

    if (canReturnTokensDirectly) {

        // We have tokens as cookie already that means a successful login previously succeeded
        // but this login has probably been done from a different client with a different client_id
        // We call the custom auth flow along with the token we have to get a new one for the current client_id
        // For this to work we need to extract the username from the cookie

        let tokenDecoded = jwt_decode(cookies.access_token);
        let tokenUsername = tokenDecoded['username'];

        var authenticationData = {
            accessToken: cookies.access_token // This will be verified by the DefineAuthChallenge trigger Lambda
        };
        var authenticationDetails = cognitoidentityserviceprovider.AuthenticationDetails(authenticationData);
        var poolData = { 
            UserPoolId : process.env.AUTH_AMPLIFYIDENTITYBROKERAUTH_USERPOOLID,
            ClientId : client_id
        };
        var userPool = cognitoidentityserviceprovider.CognitoUserPool(poolData);
        var userData = {
            Username : tokenUsername,
            Pool : userPool
        };

        var cognitoUser = cognitoidentityserviceprovider.CognitoUser(userData);
        cognitoUser.setAuthenticationFlowType("CUSTOM_AUTH");

        try {
            var result = await asyncAuthenticateUser(cognitoUser, authenticationDetails);

            // TODO delete all these logs
            console.log("Success ----");
            console.log(result);
            console.log("idToken = " + result.getIdToken().getJwtToken());
            console.log("accessToken = " + result.getAccessToken().getJwtToken());
            console.log("refreshToken = " + result.getRefreshToken().getJwtToken());

            var encrypted_id_token = await encryptToken(result.getIdToken().getJwtToken());
            var encrypted_access_token = await encryptToken(result.getAccessToken().getJwtToken());
            var encrypted_refresh_token = await encryptToken(result.getRefreshToken().getJwtToken());

            params.id_token = encrypted_id_token;
            params.access_token = encrypted_access_token;
            params.refresh_token = encrypted_refresh_token;
        }
        catch (error) {
          console.log("Token swap fail, this may be a tentative of token stealing");
          return { // Redirect to login page with forced pre-logout
            statusCode: 302,
            headers: {
                Location: '/?client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&authorization_code=' + authorizationCode + '&forceAuth=true' + insertStateIfAny(event),
            }
          };
        }
    }

    try {
        var result = await docClient.put(params).promise();
    } catch (error) {
        console.error(error);
    }

    if (canReturnTokensDirectly) {
        return { // Redirect directly to client application passing the authorization code
            statusCode: 302,
            headers: {
                Location: redirect_uri + '/?code=' + authorizationCode + insertStateIfAny(event),
            }
        };
    }
    else {
        return { // Redirect to login page
            statusCode: 302,
            headers: {
                Location: '/?client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&authorization_code=' + authorizationCode + insertStateIfAny(event),
            }
        };
    }
}

async function handleImplicit(event) {
    var client_id = event.queryStringParameters.client_id;
    var redirect_uri = event.queryStringParameters.redirect_uri;
    if (client_id === undefined || redirect_uri === undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify("Required parameters are missing"),
        };
    }

    // Verify client and redirect_uri against clients table
    var validClient = await verifyClient(client_id, redirect_uri);
    if (!validClient) {
        return {
            statusCode: 400,
            body: JSON.stringify("Invalid Client"),
        };
    }

    var cookies = await getCookiesFromHeader(event.headers);
    var canReturnTokensDirectly = cookies.id_token ? true : false; // If there is already an id_token cookie we can return it directly

    if (canReturnTokensDirectly) {
        return { // Redirect directly to client application with ID token from cookie
            statusCode: 302,
            headers: {
                Location: redirect_uri + '/?id_token=' + cookies.id_token + insertStateIfAny(event),
            }
        };
    }
    else {
        return { // Redirect to login page
            statusCode: 302,
            headers: {
                Location: '/?client_id=' + client_id + '&redirect_uri=' + redirect_uri + insertStateIfAny(event),
            }
        };
    }
}

function insertStateIfAny(event) {
    var stateQueryString = "";

    var state = event.queryStringParameters.state;
    if (state !== undefined) {
        stateQueryString = "&state=" + state;
    }

    return stateQueryString;
}

exports.handler = async (event) => {
    if (!(event && event.queryStringParameters)) {
        return {
            statusCode: 400,
            body: JSON.stringify("Required parameters are missing")
        };
    }

    switch (event.queryStringParameters.response_type) {
        case ('code'):
            return handlePKCE(event);

        case ('id_token'):
            return handleImplicit(event);

        default:
            return {
                statusCode: 400,
                body: JSON.stringify("Response type is missing or invalid"),
            };
    }
};