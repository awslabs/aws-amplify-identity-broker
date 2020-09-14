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

 // Template used to generate HTML email
 const template = (email, link) => `<html>

 <head>
     <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
     <style type="text/css">
         body {
             margin: 0;
             font: 12px/16px Arial, sans-serif;
         }
 
         /* buttons */
 
         .buttonComponent {
             border-collapse: separate;
             text-decoration: none !important;
             line-height: 47px;
             border-radius: 3px;
             border-style: solid;
             border-color: #CBA957;
             border-width: 1px;
             background: #F0C354 linear-gradient(#F7DEA2, #F0C354) repeat scroll 0%=0%;
             background-color: #ffa723;
             white-space: nowrap;
             min-width: 222px;
             min-height: 47px;
         }
 
         .buttonComponentLink {
             color: rgb(27, 27, 27) !important;
             font: 16px/ 18px Arial, sans-serif !important;
             display: table-cell;
             margin: auto 0;
             vertical-align: middle;
             min-width: 222px;
             height: 47px;
         }
     </style>
 </head>
 
 <body>
     <table id="container" class="buttonComponent" bgcolor="#ffa723" width="222">
         <tbody>
             <tr>
                 <td style="width:100%; vertical-align:middle;" align="center" valign="middle" width="100%" height="47">
                     <a class="buttonComponentLink" href="${link}">Click here </a>
                 </td>
             </tr>
         </tbody>
     </table>
 
 </body>
 
 </html>`


  
   console.log(event);

   const url = process.env.REDIRECTURL + "/accountConfirmation";
   const userName = event.userName;
   const region = event.region;
   const email = event.request.userAttributes.email;
   const codeParameter = event.request.codeParameter;
   const clientId = event.callerContext.clientId;
 
   const link = url + "?code=" + codeParameter + "&username=" + userName + "&clientId=" + clientId + "&region=" + region + "&email=" + email;
   // Identify why was this function invoked
   if (event.triggerSource === "CustomMessage_SignUp") {
     let lang = event.request.userAttributes["locale"]; // Acesss the event data of custom user Attribute lang
     console.log("Lang is " + lang);
 
     // Ensure that your message contains event.request.codeParameter. This is the placeholder for code that will be sent
     // French
     if (lang == "fr") {
       event.response.smsMessage = "Bienvenue à " + providerName + ". Votre code de confirmation est " + event.request.codeParameter;
       event.response.emailSubject = "Action Requise: Vérifiez vos coordonnées";
       event.response.emailMessage = `Merci, <br> d'avoir créé un compte avec nous. Veuillez cliquer sur le lien ci-dessous pour confirmer l'inscription! <br><br><br>` + template(email,link);
     }
     //English
     else {
       event.response.smsMessage = "Welcome to " + providerName + ". Your confirmation code is " + event.request.codeParameter;
       event.response.emailSubject = "Action Required: Verify your contact info.";
       event.response.emailMessage = "Hello, <br> Thank you for creating an account with us. Please click on the below link to confirm the registration! <br><br><br>" + template(email,link)
     }
   }
   // Create custom message for other events
 
   // Return to Amazon Cognito
   callback(null, event);
 };