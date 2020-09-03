/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

 var providerName = "Amplify Identity Broker";
 exports.handler = (event, context, callback) => {
   console.log(event);

   const url = process.env.REDIRECTURL + "/accountConfirmation";
   const userName = event.userName;
   const region = event.region;
   const email = event.request.userAttributes.email;
   const codeParameter = event.request.codeParameter;
   const clientId = event.callerContext.clientId;
   
 
   // Identify why was this function invoked
   if (event.triggerSource === "CustomMessage_SignUp") {
     let lang = event.request.userAttributes["locale"]; // Acesss the event data of custom user Attribute lang
     console.log("Lang is " + lang);
 
     // Ensure that your message contains event.request.codeParameter. This is the placeholder for code that will be sent
     // French
     if (lang == "fr") {
       const link = `<a href="${url}?code=${codeParameter}&username=${userName}&clientId=${clientId}&region=${region}&email=${email}" target="_blank"> lien </a>`;
       event.response.smsMessage = "Bienvenue à " + providerName + ". Votre code de confirmation est " + event.request.codeParameter;
       event.response.emailSubject = "Action requise: Vérifiez vos coordonnées";
       event.response.emailMessage = `Merci de vous être inscrit. Cliquez ici ${link} pour vérifier votre email.`;
     }
     //English
     else {
       const link = `<a href="${url}?code=${codeParameter}&username=${userName}&clientId=${clientId}&region=${region}&email=${email}" target="_blank"> link </a>`;
       event.response.smsMessage = "Welcome to " + providerName + ". Your confirmation code is " + event.request.codeParameter;
       event.response.emailSubject = "Action required: Verify your contact info.";
       event.response.emailMessage = `Thank you for signing up. Click this ${link} to verify your email.`;
     }
   }
   // Create custom message for other events
 
   // Return to Amazon Cognito
   callback(null, event);
 };