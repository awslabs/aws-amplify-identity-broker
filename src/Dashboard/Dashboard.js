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
        fetch("https://pvaewuakua.execute-api.us-east-2.amazonaws.com/ilyasdev/clients")
            .then(res => res.json())
            .then((result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        registeredClients: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    Logout = () => {
        this.props.history.push('/logout');
    }

    render() {
        console.log("this.state.registeredClients: " + this.state.registeredClients);
        if (this.state.registeredClients.length === 0) {
            return null
        }

        var registeredClientsList = this.state.registeredClients.map(Attribute =>
            (Attribute.Name !== "identities") &&
            <div class="grid-container">
                <div class="grid-item">
                    <a href={Attribute.redirect_uri.S}>
                        <img className="logos" src={"/logos/" + Attribute.client_id.S + ".png"}></img>
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