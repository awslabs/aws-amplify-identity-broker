/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
*/

/*
 * Protected Pages with Authentication and accepted Terms of Service
 */

import React from 'react'
import { Redirect } from 'react-router-dom'

import { Auth } from 'aws-amplify';

import { I18n } from '@aws-amplify/core';
import { strings } from '../../Pages/TermsOfService/languageStrings';
I18n.putVocabularies(strings);

class ProtectedRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isAuthenticated: true,
      resignToS: false
    }
  }

  componentDidMount() {
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
            if ((tosCurrentVersionInt > tosSignedVersionInt) || !tosSigned) 
              this.setState({ resignToS: true })    
          })
          .catch(() => this.setState({resignToS: false}))
      })
      .catch(() => this.setState({isAuthenticated: false}))
  }

  render() {
    /*
     * Route SingIn Page (loginPath) and Terms of Service (tosPath)
     */ 
    const loginPath = '/';
    let tosPath = 'tos';

    /*
     * "path" of the requesting component to redirect back
     */
    const redirectTo = this.props.path.replace('/', '') || null;

    /*
     * Target component
     */
    const Component = this.props.component;

    /*
     * If user NOT signed in redirect to "loginPath" - add QueryParam redirectTo
     * If user NOT accepted the Terms of Service redirect to "tosPath" - add QueryParam redirectTo
     * Otherwise route to target component
     * */
    return !this.state.isAuthenticated
      ? (<Redirect to={{ pathname: loginPath, search: `redirect=${redirectTo}`}} push={true} />)
      : this.state.resignToS
        ? (<Redirect to={{ pathname: tosPath, search: `redirect=${redirectTo}`}} push={true} />)
        : (<Component />)
  }
}

export default ProtectedRoute;
