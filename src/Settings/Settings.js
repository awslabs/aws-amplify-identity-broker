/*
  * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
  * SPDX-License-Identifier: MIT
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

import React from 'react';
import { Auth } from 'aws-amplify';
import './settings.css';
import { AmplifyButton } from '@aws-amplify/ui-react';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userAttributes: []
        }
    }

    componentDidMount() {
        Auth.currentAuthenticatedUser().then(CognitoUser => {
            Auth.userAttributes(CognitoUser).then(CognitoUserAttribute => {
                this.setState({ userAttributes: CognitoUserAttribute })
            })
        })
    }

    Logout = () => {
        this.props.history.push('/logout');
    }

    // Currently only displaying current user attributes 
    // To update user attributes use Auth.updateUserAttributes() https://aws-amplify.github.io/amplify-js/api/classes/authclass.html#updateuserattributes
    render() {
        if (this.state.userAttributes.length === 0) {
            return null
        }

        var userAttributeFields = this.state.userAttributes.map(Attribute =>
            (Attribute.Name !== "identities") &&
            <div>
                <label>{Attribute.Name}</label>
                {Attribute.Value}
            </div>
        );

        return (
            <div className='wrapper'>
                <div className='form-wrapper'>
                    <h2>User Attributes:</h2>
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)" }}>
                            {userAttributeFields}
                        </div>
                        <div className='submit'>
                            <AmplifyButton className='logout' onClick={this.Logout}>{I18n.get('Logout')}</AmplifyButton>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Settings;

