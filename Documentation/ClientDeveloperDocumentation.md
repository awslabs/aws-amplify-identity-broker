# Client Developer Documentation

This document explains how to use the broker as a login solution for your websites and mobile application.

In addition from the explanation of this page you can find a working example [here](https://github.com/awslabs/aws-amplify-identity-broker-client) (this project uses AWS Amplify but you are free to use anything else).

Before any client to be able to use the _AWS Amplify Identity Broker_ you'll need to [register your client](https://github.com/awslabs/aws-amplify-identity-broker/blob/master/Documentation/UserDocumentation.md#register-a-client).

## Choose your flow (Implicit, PKCE)

The AWS Amplify identity broker exposes two standard Oauth2 authentication flows __Implicit__ and __PKCE__. You can create different client using different flows at the same time.

### Implicit flow

This is the simpler flow. It require just a link from your app and for you to read a GET parameter. 

This flow only returns an _id_token_ you __should not__ use an id_token to authenticate a user against a backend. This is a [recommendation from the Oauth2 BCP](https://tools.ietf.org/html/draft-ietf-oauth-security-topics-09#section-2.1.2)

<details>
  <summary>Diagram of the flow (click to expand)</summary>
  
  Flow entities are:
  * __User__: the user and his browser
  * __Client Application__: (like the one from our [client demo project](https://github.com/awslabs/aws-amplify-identity-broker-client))
  * __Identity Broker__ : the main project
  * __DynamoDB__: the broker storage layer
  * __Cognito__: The Cognito service and endpoints
  
  __Implicit flow__
  
  ![Implicit flow](Images/ImplicitFlow.png "Implicit flow")
</details>

### PKCE flow

PKCE is the most secured flow. Because it does not provide token through redirection he is considered safer for mobile applications.
It will require you to generate random strings, apply some hashed and exchange information two times with the broker.

Expand the section below to see the detailed flows:

<details>
  <summary>Diagram of the flow (click to expand)</summary>
  
  Flow entities are:
  * __User__: the user and his browser
  * __Client Application__: (like the one from our [client demo project](https://github.com/awslabs/aws-amplify-identity-broker-client))
  * __Identity Broker__ : the main project
  * __DynamoDB__: the broker storage layer
  * __Cognito__: The Cognito service and endpoints
  
  ![PKCE flow](Images/PKCEFlow.png "PKCE flow")
</details>

## How to create a login button/link 


## How to redirect from authenticated page when no JWT token provided

If a user of your application bookmarked a page of your application (or send a link to a friend) and if this page requires authentication it is possible that the user won't have a valid JWT token.

In that case you have to redirect him to the broker using the same method as the login (see previous section).

_Note: You cannot redirect the user back to the current page but only to your application registered redirect_uri. This is a security measure to make sure an attacker cannot pass a redirect_uri to a page he is in control of. You can fork the broker to change that but we do not recommend to do so._

## How to create a logout link
## How to create a signup link
## How to verify a JWT token
## How to refresh token
## Migration instructions
## If you use Amplify

First, you should checkout out our [AWS Amplify client example](https://github.com/awslabs/aws-amplify-identity-broker-client).

From any Amplify app you'll need to add our [Auth.tsx helper](https://github.com/awslabs/aws-amplify-identity-broker-client/blob/master/src/Auth.tsx).

Then from any authenticated page you need to make sure that the Amplify auth framework is called:

```
import authClient from '../Auth';

class MyPage extends React.Component<any> {
    async componentDidMount() {
        await authClient.handleAuth();   <-- this is what you need to add
        ...
    }
    ...
```

_See and example [here](https://github.com/awslabs/aws-amplify-identity-broker-client/blob/master/src/HomePage/index.tsx)_

After that ```authClient.isLoggedIn()``` will return true if you are logged in.

The login link can be created with the following method from our Auth helper:

```
import authClient from '../Auth';

class MyOtherPage extends React.Component<any> {

    render() {
        return (
                {
                    !authClient.isLoggedIn() &&
                    < button className="btn btn-dark" onClick={() => { authClient.login() }}>Log In</button>
                }
```

And this for logout:

```
import authClient from '../Auth';

class MyOtherOtherPage extends React.Component<any> {
    logout = () => {
        authClient.logout();
        this.props.history.replace('/');
    };

    render() {
        return (
                {
                    authClient.isLoggedIn() &&
                    < div >
                        <label className="mr-2 text-white">You are logged in as: {authClient.getUserInfo().email}</label>
                        <button className="btn btn-link" onClick={() => { authClient.login("/logout") }}>Switch User</button>&nbsp;&nbsp;
                        <button className="btn btn-dark" onClick={() => { this.logout() }}>Log Out</button>
                    </div >
                }
            </nav >
        );
    }
}
```

_See and example [here](https://github.com/awslabs/aws-amplify-identity-broker-client/blob/master/src/NavBar/index.tsx)_


