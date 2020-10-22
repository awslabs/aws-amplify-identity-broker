/*
* Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
* SPDX-License-Identifier: MIT
*
* Licensed under the MIT License. See the LICENSE accompanying this file
* for the specific language governing permissions and limitations under
* the License.
*/

import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import TosContent from './content';

class TermsOfService extends Component { 
  constructor(props) {
    super(props);
    this.state = { 
      lang: 'en',
      signedIn: false,
      tos_signed: false,
      tos_version: ''    
    }
  }

  componentDidMount() {
    Auth.currentAuthenticatedUser()
    .then(CognitoUser => {
      this.setState({signedIn: true});
      Auth.userAttributes(CognitoUser)
      .then(CognitoUserAttribute => {
        CognitoUserAttribute.forEach(item => {
          switch (item.Name) {
            case 'custom:tos_signed':
              this.setState({ tos_signed: item.Value === 'true' });
              break;
            case 'custom:tos_version': 
              this.setState({ tos_version: item.Value });
              break;
            default:
              break;         
          }
        })
        console.log(this.state)
      })
    })
  }

  render() {
    return (
      <div>
        <TosContent signedIn={this.state.signedIn} />
      </div>
    );
  }
}

export default TermsOfService;
