/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

var amplifyMeta = {};
var amplifyTeams = {};
const fs = require("fs");
const path = require('path');
if ((!fs.existsSync("./amplify/backend/amplify-meta.json")) ||
    (!fs.existsSync("./amplify/team-provider-info.json")) ||
    (!fs.existsSync("./src/aws-exports.js"))
    ) {
    console.error("Amplify is not configured !!");
    console.log(" please run:");
    console.log(" > amplify init");
    console.log(" Select an existing environment (choose dev to start)");
    process.exit();
} else {
    amplifyMeta = require("./amplify/backend/amplify-meta.json");
    amplifyTeams = require("./amplify/team-provider-info.json");
}
const REGEX = /.*-(\w+)/;
const AMPLIFY_ENV = amplifyMeta.storage.amplifyIdentityBrokerCodesTable.output.Name.match(REGEX)[1];

console.log("Injecting config");
console.log("AMPLIFY_ENV is " + AMPLIFY_ENV);

var appHostingDomain = undefined;
if(amplifyTeams[AMPLIFY_ENV].categories.function.amplifyIdentityBrokerPostDeployment.hostingDomain) {
    appHostingDomain = amplifyTeams[AMPLIFY_ENV].categories.function.amplifyIdentityBrokerPostDeployment.hostingDomain;
} else if(amplifyMeta.hosting.S3AndCloudFront.output.CloudFrontDomainName) {
    appHostingDomain = "https://" + amplifyMeta.hosting.S3AndCloudFront.output.CloudFrontDomainName;
} else {
    console.log("WARNING : No hosting domain defined!!");
    process.exit();
}

if (appHostingDomain) {
    const redirectSignIn  = appHostingDomain;
    const redirectSignOut = appHostingDomain + "/logout";

    var rawdata = fs.readFileSync('./src/aws-exports.js', 'utf-8');

    // Inject broker domain in aws-exports.js
    var withLogout = rawdata.replace(/(redirectSignOut\"+\:[ \t]+\")(.*\")/, "$1"+redirectSignOut+"\"");
    var withBoth = withLogout.replace(/(redirectSignIn\"+\:[ \t]+\")(.*\")/, "$1"+redirectSignIn+"\"");

    fs.writeFileSync('./src/aws-exports.js', withBoth, 'utf-8');
}

module.exports = function override(config, env) {
    console.log("Build env is " + env);
    let localConfig = {};
    switch (AMPLIFY_ENV) {
        case "vpprod": localConfig = {
            "providers": []
        };
            break;
        case "prod": localConfig = {
            "providers": ["AWSSSO", "OIDCIdentityProvider", "LoginWithAmazon", "Facebook", "Google"]
        };
            break;
        case "preprod": localConfig = {
            "providers": ["AWSSSO", "OIDCIdentityProvider", "LoginWithAmazon", "Facebook", "Google"]
        };
            break;
        default:
            localConfig = {
                "providers": ["AWSSSO", "OIDCIdentityProvider", "LoginWithAmazon", "Facebook", "Google"],
            };
    }

    if (!config.externals) {
        config.externals = {};
    }
    config.externals.Config = JSON.stringify(localConfig);

    return config;
}
