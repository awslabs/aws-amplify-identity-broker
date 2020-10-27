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
      redirect: null,
      tosResign: false,
      tosCurrentVersion: 0,
      snackBarOps: {
        type: 'info',
        open: false,
        vertical: 'top',
        horizontal: 'center',
        autoHide: 0,
        message: ''
      },
    }
  }

  componentDidMount() {
    let redirect = new URLSearchParams(window.location.search).get("redirect") || null;
    if (redirect) this.setState({ redirect: redirect });

    this.setState({ tosCurrentVersion: I18n.get("VERSION_ID") || 0 })
    this.checkTos();
  }

  getTosInfo = () => new Promise((resolve, reject) => {
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
            
            if (this.state.tosCurrentVersion > tosSignedVersionInt) this.setState({ tosResign: true });

            if (!tosSigned) this.setState({ tosResign: true });

            resolve()
          }).catch(err => {console.log(err); reject(err)});
      }).catch(err => { if (err !== 'not authenticated') console.log(err); reject(err) });  
  })

  checkTos = async (reload = true) => {
    if (reload) await this.getTosInfo();

    if (this.state.tosResign === true) {
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

  updateTosAttribute = () => new Promise((resolve, reject) => {
    let attributes = {'custom:tos_version' : this.state.tosCurrentVersion.toString(), 'custom:tos_signed' : 'true'};

    Auth.currentAuthenticatedUser()
      .then(CognitoUser => {
        Auth.updateUserAttributes(CognitoUser, attributes)
          .then(() => {resolve()})
          .catch(err => {console.log(err); reject(err)})
      })
      .catch(err => {console.log(err); reject(err)})
  })

  handleLangChange = (event) => {
    this.setState({lang: event});
    this.checkTos(false);
  }

  handleTosAccepted = async () => {
    this.updateTosAttribute()
      .then(async () => {
        await this.checkTos();
        this.setState({
          tosResign: false,
          snackBarOps: {
            type: 'success',
            open: true,
            vertical: 'top',
            horizontal: 'center',
            autoHide: 5000,
            message: I18n.get('MSG_TOS_ACCEPTED')
          }
        }) 

        if (this.state.redirect) window.location.href = this.state.redirect;
      })
      .catch((err) => {
        console.log(err);

        this.setState({
          snackBarOps: {
            type: 'error',
            open: true,
            vertical: 'top',
            horizontal: 'center',
            autoHide: 5000,
            message: I18n.get('MSG_TOS_ACCEPTED_ERROR')
          }
        }) 
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
        
        <TosContent reSign={this.state.tosResign} tosAccept={this.handleTosAccepted} tosDecline={this.handleTosDecline} />

        <AppSnackbar ops={this.state.snackBarOps}/>
      </div>
    );
  }
}

export default TermsOfService;
