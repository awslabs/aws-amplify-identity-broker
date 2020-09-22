/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */
 
 'use strict';
 var AWS = require('aws-sdk');
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
                 location: process.env.HOSTING_DOMAIN
             });
         }
     ).catch(
         (error) => {
             if(error.message === "User cannot be confirmed. Current status is CONFIRMED"){
                 var html = `<html><head><title>Account already confirmed</title></head> 
                             <body><b>The account ${username} has been already confirmed</b><br/>
                             Click <a href="${process.env.HOSTING_DOMAIN}">here</a> to login.
                             </body></html>`;
                     
                 context.succeed(html);
             } else {
                 callback(error.message);
             }
         }
     )
 };