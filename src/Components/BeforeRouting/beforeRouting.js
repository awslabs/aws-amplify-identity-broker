import { Auth } from 'aws-amplify';

import { I18n } from '@aws-amplify/core';
import { strings } from '../../Pages/TermsOfService/languageStrings';
I18n.putVocabularies(strings);

export const checkBeforeRouting = () => new Promise((resolve, reject) => {
  console.log('"O')
  Auth.currentAuthenticatedUser() 
    .then(CognitoUser => {
      Auth.userAttributes(CognitoUser)
        .then(CognitoUserAttributes => {
          let tosSigned = false;
          let tosSignedVersion = '';
          CognitoUserAttributes.forEach(item => {
            switch (item.Name) {
              case 'custom:tos_signed':
                tosSigned = (item.Value === 'true');
                break;
              case 'custom:tos_version':
                tosSignedVersion = item.Value;
                break;
              default:
                break;
            };
          })

          const tosSignedVersionInt = parseInt(tosSignedVersion) || 0;
          const tosCurrentVersionInt = I18n.get('VERSION_ID') || 0
          if ((tosCurrentVersionInt > tosSignedVersionInt) || !tosSigned) {
            //Route Sign ToS
            let redirectTo = 'setttings';
            window.location.href = `/tos?redirect=${redirectTo}&tosResign=true&tosVersion${tosCurrentVersionInt}`;
          }

          resolve();
        })
        .catch(err => {
          console.log(err);
          reject(err) 
        });
    })
    .catch(err => {
      if (err === 'not authenticated') {
        //Route to Login
        window.location.href = '/';
      } else {
        console.log(err);
        reject(err)
      }
    });
})
