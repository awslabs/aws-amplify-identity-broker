/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

var amplifyMeta = {};
const fs = require("fs");
if (!fs.existsSync("./amplify/backend/amplify-meta.json")) {
    console.error("Amplify is not configured !!");
    console.log(" please run:");
    console.log(" > amplify init");
    console.log(" Select an existing environment (choose dev to start)");
    process.exit();
} else {
    amplifyMeta = require("./amplify/backend/amplify-meta.json");
}
const REGEX = /.*-(\w+)/;
const AMPLIFY_ENV = amplifyMeta.storage.amplifyIdentityBrokerCodesTable.output.Name.match(REGEX)[1];

console.log("Injecting config");
console.log("AMPLIFY_ENV is " + AMPLIFY_ENV);

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
        case "liamdev": localConfig = {
            "providers": ["Facebook", "LoginWithAmazon", "Google"]
        };
            break;
        case "sampledev": localConfig = {
                "providers": ["AWSSSO", "OIDCIdentityProvider", "LoginWithAmazon", "Facebook", "Google"],
                "hostedUIUrl": "https://brokerauth.auth.us-east-1.amazoncognito.com",
        };
            break;
        default:
            localConfig = {
                "providers": [],
            };
    }

    if (!config.externals) {
        config.externals = {};
    }
    config.externals.Config = JSON.stringify(localConfig);

    return config;
}
