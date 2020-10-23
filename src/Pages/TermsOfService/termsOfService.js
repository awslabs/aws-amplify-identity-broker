/*
* Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
* SPDX-License-Identifier: MIT
*
* Licensed under the MIT License. See the LICENSE accompanying this file
* for the specific language governing permissions and limitations under
* the License.
*/

import React, { Component } from 'react';
import { I18n } from '@aws-amplify/core';
import { Auth } from 'aws-amplify';
import TosContent from './content';

import LanguageSelect from '../../Components/LanguageSelect/languageSelect';
import AppSnackbar from '../../Components/Snackbar/snackbar';

import { strings } from './languageStrings';
I18n.putVocabularies(strings);

class TermsOfService extends Component { 
  constructor(props) {
    super(props);
    this.state = { 
      lang: 'en',
      tos_resign: false,
      snackBarOps: {
        type: 'info',
        open: false,
        vertical: 'top',
        horizontal: 'center',
        autoHide: 0,
        message: ''
      }
    }
  }

  componentDidMount() {
    this.checkTos();
  }

  getTosInfo = () => new Promise((resolve, reject) => {
    Auth.currentAuthenticatedUser()
      .then(CognitoUser => {
        Auth.userAttributes(CognitoUser)
          .then(CognitoUserAttribute => {
            let tosSigned = false;
            let tosSignedVersion = '';
            CognitoUserAttribute.forEach(item => {
              switch (item.Name) {
                case 'locale':
                  this.setState({ lang: item.Value });
                  break;
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
            const tosVersion = I18n.get("VERSION_ID") || 1;
            if (tosVersion > tosSignedVersionInt) this.setState({ tos_resign: true });

            if (!tosSigned) this.setState({ tos_resign: true });
            resolve()
          }).catch(err => { console.log(err); reject(err)});
      }).catch(err => { if (err !== 'not authenticated') console.log(err); reject(err) });  
  })

  checkTos = async (reload = true) => {
    if (reload) await this.getTosInfo();

    if (this.state.tos_resign === true) {
      this.setState({
        snackBarOps: {
          type: 'error',
          open: true,
          vertical: 'top',
          horizontal: 'center',
          autoHide: null,
          message: I18n.get("MSG_TOS_RESIGN")
        }
      })   
    }
  }

  handleLangChange = (event) => {
    this.setState({lang: event});
    this.checkTos(false);
  }

  handleTosAccepted = () => {
    this.setState({ 
      tos_resign: false,
      snackBarOps: {
        type: 'success',
        open: true,
        vertical: 'top',
        horizontal: 'center',
        autoHide: 3000,
        message: I18n.get('MSG_TOS_ACCEPTED')
      }
    })    
  }

  handleTosDecline = () => {
    this.setState({
      snackBarOps: {
        type: 'error',
        open: true,
        vertical: 'top',
        horizontal: 'center',
        autoHide: null,
        message: I18n.get('MSG_TOS_DECLINE')
      }
    })
  }

  render() {    
    return (
      <div>
        <LanguageSelect lang={this.state.lang} newLang={this.handleLangChange} />
        
        <TosContent reSign={this.state.tos_resign} tosAccept={this.handleTosAccepted} tosDecline={this.handleTosDecline} />

        <AppSnackbar ops={this.state.snackBarOps}/>
      </div>
    );
  }
}

export default TermsOfService;
