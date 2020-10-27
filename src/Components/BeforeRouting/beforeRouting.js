/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
*/

/*
 * With this Function we check if the user is "Signed In" and accepted the current "Terms of Service (ToS)"
 * We put this Function in all Pages in the "componentDidMount()" Function to only allow Signed In Users with actual ToS
 */

import { Auth } from 'aws-amplify';

import { I18n } from '@aws-amplify/core';
import { strings } from '../../Pages/TermsOfService/languageStrings';
I18n.putVocabularies(strings);

export const checkBeforeRouting = (redirectTo) => new Promise((resolve, reject) => {
  Auth.currentAuthenticatedUser() 
    .then(CognitoUser => {
      Auth.userAttributes(CognitoUser)
        .then(CognitoUserAttributes => {
          let tosSigned = false;
          let tosSignedVersion = '';

          /*
           * Load the "Custom Attributes" ToS for the current user
           */
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

          /*
           * Check if the user need to "Sign" or "Resign" the ToS
           * For reasons of simplicity we load the current ToS version from 'languageString - VERSION_ID'
           */
          const tosSignedVersionInt = parseInt(tosSignedVersion) || 0;
          const tosCurrentVersionInt = I18n.get('VERSION_ID') || 0

          /*
           * If the current ToS are newer or the actual ToS are not sigened we redirect the user to '/tos'
           * To redirect the user back to '/settings' after sign the ToS we add Query Param 'redirect'
           */
          if ((tosCurrentVersionInt > tosSignedVersionInt) || !tosSigned) {
            if (redirectTo) window.location.href = `/tos?redirect=${redirectTo}`;
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
        /*
         * If no current user signed in we redirect to '/' for a login
         */
        window.location.href = '/';
      } else {
        console.log(err);
        reject(err)
      }
    });
})
