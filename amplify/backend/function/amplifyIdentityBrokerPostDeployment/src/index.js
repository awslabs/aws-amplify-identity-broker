/*
 * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT
 *
 * Licensed under the MIT License. See the LICENSE accompanying this file
 * for the specific language governing permissions and limitations under
 * the License.
 */

const response = require("./cfn-response");
const AWS = require("aws-sdk");
var lambda = new AWS.Lambda();
var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event, context) => {
  var domainUrl = event["ResourceProperties"]["CloudfrontDomain"];

  console.log(event);
  console.log(context);

  if (event["ResourceProperties"]["OverrideDomain"] != "") {
    domainUrl = event["ResourceProperties"]["OverrideDomain"];
  }

  try {
    const UserPoolId = event["ResourceProperties"]["UserPoolId"];
    const AppClientId = event["ResourceProperties"]["AppClientId"];
    const AppClientIdWeb = event["ResourceProperties"]["AppClientIdWeb"];
    console.log(
      `Updating UserPool ${UserPoolId} app ${AppClientId} and app ${AppClientIdWeb} with callbacks ${domainUrl}`
    );
    const params = {
      ClientId: AppClientId,
      UserPoolId: UserPoolId,
      CallbackURLs: [domainUrl],
      LogoutURLs: [domainUrl + "/logout"],
    };
    await cognitoidentityserviceprovider.updateUserPoolClient(params).promise();

    const paramsWeb = {
      ClientId: AppClientIdWeb,
      UserPoolId: UserPoolId,
      CallbackURLs: [domainUrl],
      LogoutURLs: [domainUrl + "/logout"],
    };
    await cognitoidentityserviceprovider.updateUserPoolClient(paramsWeb).promise();

    for (const functionName of event["ResourceProperties"]["functionNames"]) {
      await injectEnvVariableToLambda(
        "HOSTING_DOMAIN",
        domainUrl,
        functionName
      );
    }
    return await response.send(event, context, response.SUCCESS, { DomainDeployed: domainUrl });
  } catch (err) {
    console.log(err, err.stack);
    return await response.send(event, context, response.FAILED, { DomainDeployed: domainUrl });
  }
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
