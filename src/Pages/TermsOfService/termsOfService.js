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

import LanguageSelect from '../../Components/LanguageSelect/languageSelect';

import { strings } from './languageStrings';
I18n.putVocabularies(strings);

class TermsOfService extends Component { 
  constructor(props) {
    super(props);
    this.state = { 
      lang: 'en'
    }
  }

  handleLanguage = (languageValue) => {
    this.setState({ lang: languageValue });
  }

  render() {
    return (
      <div>
        <LanguageSelect lang={this.state.lang} newLang={this.handleLanguage}/>
        <p>{I18n.get("TITLE")}</p>
      </div>
    );
  }
}

export default TermsOfService;