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
  // Identify why was this function invoked
  if (event.triggerSource === "CustomMessage_SignUp") {
    let lang = event.request.userAttributes["locale"] // Acesss the event data of custom user Attribute lang
    console.log("Lang is " + lang);

    // Ensure that your message contains event.request.codeParameter. This is the placeholder for code that will be sent
    // French
    if (lang == "fr") {
      event.response.smsMessage = "Bienvenue à " + providerName + ". Votre code de confirmation est " + event.request.codeParameter;
      event.response.emailSubject = "Bienvenue à " + providerName;
      event.response.emailMessage = "Merci pour votre inscription. " + event.request.codeParameter + " est votre code de vérification";
    }
    //English
    else {
      event.response.smsMessage = "Welcome to " + providerName + ". Your confirmation code is " + event.request.codeParameter;
      event.response.emailSubject = "Welcome to " + providerName;
      event.response.emailMessage = "Thank you for signing up. " + event.request.codeParameter + " is your verification code";
    }
  }
  // Create custom message for other events

  // Return to Amazon Cognito
  callback(null, event);
};