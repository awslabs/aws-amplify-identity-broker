/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

const AWS = require("aws-sdk");v
var lambda = new AWS.Lambda();

exports.handler = async (event, context) => {

    const domainUrl = event["ResourceProperties"]["ApiDomain"];

    if(["ResourceProperties"]["overRideApiDomain"] != "") {
        domainUrl = event["ResourceProperties"]["overRideApiDomain"];
    }

    try{
        event["ResourceProperties"]["functionNames"].forEach(functionName => {
            injectEnvVariableToLambda("API_DOMAIN", domainUrl, functionName);
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

