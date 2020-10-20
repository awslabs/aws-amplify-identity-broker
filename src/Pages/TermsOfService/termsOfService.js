/*
* Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
* SPDX-License-Identifier: MIT
*
* Licensed under the MIT License. See the LICENSE accompanying this file
* for the specific language governing permissions and limitations under
* the License.
*/

import React, { Component } from 'react';
import TosContent from './content';

class TermsOfService extends Component { 
  constructor(props) {
    super(props);
    this.state = { 
      lang: 'en'
    }
  }

  render() {
    return (
      <div>
        <TosContent />
      </div>
    );
  }
}

export default TermsOfService;