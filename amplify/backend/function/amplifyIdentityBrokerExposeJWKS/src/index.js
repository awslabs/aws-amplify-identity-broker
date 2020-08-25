/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */


/* Amplify Params - DO NOT EDIT
    AUTH_AMPLIFYIDENTITYBROKERAUTH_USERPOOLID
    REGION
Amplify Params - DO NOT EDIT */

const https = require('https');
exports.handler = async (event) => {
  //Set your Lamada environment variable 
  var region = process.env.REGION;
  var userPoolId = process.env.AUTH_AMPLIFYIDENTITYBROKERAUTH_USERPOOLID;
  //Empty variable for data
  let dataString = '';
  //Function starts
  const response = await new Promise((resolve, reject) => {
    if ((typeof (userPoolId) == 'undefined') || (typeof (region) == 'undefined')) {
      req.on('error', (e) => {
        reject({
          //Failed: not found
          statusCode: 404,
          body: 'Error 404: The userpoolid and region is undefined or does not exist. Please go into the Lamada function of exposejwksfunction and config the Lamada environments variables. "'
        });
      });
      console.log("Error call failed.");
    } else {
      //Create URL link to JWKS key
      var url = "https://cognito-idp." + region + ".amazonaws.com/" + userPoolId + "/.well-known/jwks.json";
      const req = https.get(url, function (res) {
        res.on('data', chunk => {
          dataString += chunk;
        });
        res.on('end', () => {
          resolve({
            // Successful
            statusCode: 200,
            body: JSON.stringify(JSON.parse(dataString), null, 4)
          });
        });
      });
      console.log("Successful");
    }
  });
  // Return response to Api Gateway
  return response;
};

