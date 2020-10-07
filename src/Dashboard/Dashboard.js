/*
* Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
* SPDX-License-Identifier: MIT
*
* Licensed under the MIT License. See the LICENSE accompanying this file
* for the specific language governing permissions and limitations under
* the License.
*/

import React from 'react';
import './dashboard.css';
import { API } from 'aws-amplify';
import { AmplifyButton } from '@aws-amplify/ui-react';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registeredClients: [],
            isLoaded: []
        }
    }

    componentDidMount() {
        const apiName = 'amplifyIdentityBrokerApi';
        const path    = '/clients';

        API
            .get(apiName, path)
            .then(response => {
                this.setState({
                    isLoaded: true,
                    registeredClients: response
                });
            })
            .catch(error => {
                this.setState({
                    isLoaded: true,
                    error
                });
            });
    }

    Logout = () => {
        this.props.history.push('/logout');
    }

    render() {
        if (this.state.registeredClients.length === 0) {
            return null
        }

        var registeredClientsList = this.state.registeredClients.map(Attribute =>
            (Attribute.Name !== "identities") &&
            <div className="grid-container">
                <div className="grid-item">
                    <a href={ Attribute.logback_uri }>
                        <img className="logos" src={"/logos/" + Attribute.client_id + ".png"} alt={Attribute.client_name + " logo"}></img>
                        <br></br>
                        <label>Login to {Attribute.client_name}</label>
                    </a>
                </div>
            </div>
        );

        return (
            <div className='wrapper'>
                <div className='clients-wrapper'>
                    <h2>Your Applications:</h2>
                    <div style={{ display: "grid", gridTemplateColumns: "auto auto auto auto" }}>
                        {registeredClientsList}
                    </div>
                    <div className='submit'>
                        <AmplifyButton className='logout' onClick={this.Logout}>Logout</AmplifyButton>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;