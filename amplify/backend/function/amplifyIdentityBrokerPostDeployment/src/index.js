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
  var domainUrl = event["ResourceProperties"]["CloudfrontDomain"];

  if (event["ResourceProperties"]["OverrideDomain"] != "") {
    domainUrl = event["ResourceProperties"]["OverrideDomain"];
  }

  try {
    const UserPoolId = event["ResourceProperties"]["UserPoolId"];
    const AppClientId = event["ResourceProperties"]["AppClientId"];
    console.log(
      `Updating UserPool ${UserPoolId} app ${AppClientId} with callbacks ${domainUrl}`
    );
    const params = {
      ClientId: AppClientId,
      UserPoolId: UserPoolId,
      CallbackURLs: [domainUrl],
      LogoutURLs: [domainUrl + "/logout"],
    };
    await cognitoidentityserviceprovider.updateUserPoolClient(params).promise();

    for (const functionName of event["ResourceProperties"]["functionNames"]) {
      await injectEnvVariableToLambda(
        "HOSTING_DOMAIN",
        domainUrl,
        functionName
      );
    }
  } catch (err) {
    console.log(err, err.stack);
    return sendResponseCfn(event, context, "FAILED", domainUrl);
  }

  return sendResponseCfn(event, context, "SUCCESS", domainUrl);
};

async function injectEnvVariableToLambda(
  variableName,
  variableValue,
  functionName
) {
  var params = {
    FunctionName: functionName,
    Qualifier: "$LATEST",
  };
  var configuration = await lambda.getFunctionConfiguration(params).promise();
  var envVariables = configuration.Environment.Variables;

  envVariables[variableName] = variableValue;
  console.log("Pre-existing variables: " + JSON.stringify(envVariables));

  console.log(
    `Inject ${variableValue} into env variable ${variableName} on function ${functionName}`
  );
  var params = {
    FunctionName: functionName,
    Environment: {
      Variables: envVariables,
    },
  };
  return lambda.updateFunctionConfiguration(params).promise();
}

// Return expected for a custom resource
// See: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-custom-resources.html
function sendResponseCfn(event, context, responseStatus, domainDeployed) {
  const response_body = {
    Status: responseStatus,
    Reason: "Log stream name: " + context.log_stream_name,
    PhysicalResourceId: context.log_stream_name,
    StackId: event["StackId"],
    RequestId: event["RequestId"],
    LogicalResourceId: event["LogicalResourceId"],
    Data: {
      DomainDeployed: domainDeployed,
    },
  };
  console.log("Return response: " + JSON.stringify(response_body));
  return response_body;
}
