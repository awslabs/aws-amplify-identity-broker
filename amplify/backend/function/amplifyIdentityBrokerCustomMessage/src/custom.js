/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

 function I18N() {
    this.strings = {
        en: {
            EMAIL_GREETING: "Hello",
            EMAIL_MESSAGE: "Thank you for creating an account with us. Please click on the below link to confirm the registration!",
            SMS_MESSAGE: "Click on this link to verify your contact info: ",
            EMAIL_SUBJECT: "Action Required: Verify your contact info.",
            EMAIL_LINK: "Click here"
        },
        fr: {
            EMAIL_GREETING: "Bonjour",
            EMAIL_MESSAGE: "d'avoir créé un compte avec nous. Veuillez cliquer sur le lien ci-dessous pour confirmer l'inscription!",
            SMS_MESSAGE: "Cliquez sur ce lien pour vérifier vos coordonnées: ",
            EMAIL_SUBJECT: "Action Requise: Vérifiez vos coordonnées",
            EMAIL_LINK: "Cliquez ici"
        },
        de: {
            EMAIL_GREETING: "Hallo",
            EMAIL_MESSAGE: "Vielen Dank, dass Sie ein Account bei uns erstellt haben. Bitte klicken Sie auf den unten stehenden Link, um die Registrierung zu bestätigen.",
            SMS_MESSAGE: "Klicken Sie auf den folgenden Link, um Ihre Angaben zu überprüfen: ",
            EMAIL_SUBJECT: "Erforderliche Aktion: Überprüfen Sie Ihre Kontaktinformationen.",
            EMAIL_LINK: "Hier klicken"
        },
        nl: {
            EMAIL_GREETING: "Hallo",
            EMAIL_MESSAGE: "dBedankt voor het aanmaken van een account bij ons. Klik op de onderstaande link om de registratie te bevestigen.",
            SMS_MESSAGE: "Klik op deze link om uw contactgegevens te verifiëren: ",
            EMAIL_SUBJECT: "Actie vereist: Verifieer uw contactgegevens.",
            EMAIL_LINK: "Klik hier"
        },
    };
    this.language = "en" // default language
}

I18N.prototype.setLanguage = function(language){
    // If language not known in list we set English
    switch(language){
        case "fr":
        case "de":
        case "nl":
        case "en":
            this.language = language;
            break;
        default:
            console.log("Unsupported language " + language + " set English");
            this.language = "en";
    }
}

I18N.prototype.get = function(key){
    let languageDict = this.strings[this.language];
    return languageDict[key];
}
    
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
             min-width: 150px;
             min-height: 27px;
         }
 
         .buttonComponentLink {
             color: rgb(27, 27, 27) !important;
             font: 16px/ 18px Arial, sans-serif !important;
             display: table-cell;
             margin: auto 0;
             vertical-align: middle;
             min-width: 150px;
             height: 47px;
         }
     </style>
 </head>
 
 <body>
    <div class="greeting">
        ${translator.get("EMAIL_GREETING")} ${email},
        <br />
        ${translator.get("EMAIL_MESSAGE")}
        <br />
        <br />
        <br />
    </div>
    
     <table id="container" class="buttonComponent" bgcolor="#ffa723" width="222">
         <tbody>
             <tr>
                 <td style="width:100%; vertical-align:middle;" align="center" valign="middle" width="100%" height="27">
                     <a class="buttonComponentLink" href="${link}"> ${translator.get("EMAIL_LINK")} </a>
                 </td>
             </tr>
         </tbody>
     </table>
 
 </body>
 
 </html>`

    const url = process.env.HOSTING_DOMAIN + "/accountConfirmation";
    const userName = event.userName;
    const region = event.region;
    const email = event.request.userAttributes.email;
    const codeParameter = event.request.codeParameter;
    const clientId = event.callerContext.clientId;
    const translator = new I18N();
    const link = url + "?code=" + codeParameter + "&username=" + userName + "&clientId=" + clientId + "&region=" + region + "&email=" + email;

    // Identify why was this function invoked
    if (event.triggerSource === "CustomMessage_SignUp") {
        let lang = event.request.userAttributes["locale"]; // Access the event data of custom user Attribute lang
        translator.setLanguage(lang);
        
        event.response.smsMessage   = translator.get("SMS_MESSAGE") + " " + link;
        event.response.emailSubject = translator.get("EMAIL_SUBJECT");
        event.response.emailMessage = template(email, link);
    }

    // Return to Amazon Cognito
    callback(null, event);
};