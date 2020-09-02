'use strict';
var AWS = require('aws-sdk');
if (typeof Promise === 'undefined') {
AWS.config.setPromisesDependency(require('bluebird'));
}
var CognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({
    apiVersion: '2019-11-07',
    region: process.env.REGION
});
exports.handler = (req, context, callback) => {
console.log(req);
    const confirmationCode = req.code;
    const username = req.username;
    const clientId = req.clientId;
let params = {
        ClientId: clientId,
        ConfirmationCode: confirmationCode,
        Username: username
    };
    
console.log(params);

//Validating the user
let confirmSignUp = CognitoIdentityServiceProvider.confirmSignUp(params).promise();

//Returning the redirect url
confirmSignUp.then(
        (data) => {
            context.succeed({
                location: process.env.POST_REGISTRATION_VERIFICATION_REDIRECT_URL
            });
        }
    ).catch(
        (error) => {
            callback(error.message)
        }
    )
};