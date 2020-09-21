/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

const AWS = require("aws-sdk");
var lambda = new AWS.Lambda();
var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event, context) => {

    var domainUrl = event["ResourceProperties"]["ApiDomain"];

    if(["ResourceProperties"]["hostingDomain"] != "") {
        domainUrl = event["ResourceProperties"]["hostingDomain"];
    }

    try{
        const UserPoolId = event["ResourceProperties"]["UserPoolId"];
        const AppClientId = event["ResourceProperties"]["AppClientId"];
        console.log(`Updating UserPool ${UserPoolId} app ${AppClientId} with callbacks ${domainUrl}`);
        const params = {
            ClientId: UserPoolId,
            UserPoolId: AppClientId,
            CallbackURLs: [
                domainUrl
            ],
            LogoutURLs: [
                domainUrl + "/logout"
            ]
        };
        cognitoidentityserviceprovider.updateUserPoolClient(params, function(err, data) {
            if (err) {
                console.log(err, err.stack);
                throw err;
            } else {
                console.log(data);
            }
        });
        event["ResourceProperties"]["functionNames"].forEach(functionName => {
            injectEnvVariableToLambda("HOSTING_DOMAIN", domainUrl, functionName);
        });
    } catch(e) {
        return sendResponseCfn(event, context, "FAILED", domainUrl);
    }

    return sendResponseCfn(event, context, "SUCCESS", domainUrl);
};

function injectEnvVariableToLambda(variableName, variableValue, functionName){
    console.log(`Inject ${variableValue} into env variable ${variableName} on function ${functionName}`);
    var params = {
        FunctionName: functionName,
        Environment: {
          Variables: {
            variableName: variableValue,
          }
        }
      };
    lambda.updateFunctionConfiguration(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
            throw err;
        } else {
            console.log(data);
        }
    });
}

// Return expected for a custom resource
// See: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-custom-resources.html
function sendResponseCfn(event, context, responseStatus, domainDeployed) {
    const response_body = {
        "Status": responseStatus,
        "Reason": "Log stream name: " + context.log_stream_name,
        "PhysicalResourceId": context.log_stream_name,
        "StackId": event["StackId"],
        "RequestId": event["RequestId"],
        "LogicalResourceId": event["LogicalResourceId"],
        "Data": {
            "DomainDeployed" : domainDeployed
        }
    };
    return response_body;
}

