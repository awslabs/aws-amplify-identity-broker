# Developer Documentation

This document is for contributors of the project.

## Create your own dev environment

Follow the [deployment instructions from the user documentation](https://github.com/awslabs/aws-amplify-identity-broker/blob/master/Documentation/UserDocumentation.md#deployment-instructions).

If you need a client, you can use the [demo client project](https://github.com/awslabs/aws-amplify-identity-broker-client). But you should play with your browser and Postman for easier test of the flows.

## Architecture

The project architecture is the following:

![Projet Architecture Image](Images/DeployedArchitecture.png "Projet Architecture")

## Source code structure

This is a standard AWS Amplify & React project. It has been bootstraped using [Create React App](https://github.com/facebook/create-react-app) and the dynamic configuration is injected by [react app rewired](https://github.com/timarney/react-app-rewired).

Main code directories:

```
./src                           <-- code of the SPA
./public                        <-- static files
amplify/#current-cloud-backend  <-- current env (not in conf, in .gitignore)
amplify/backend                 <-- reference environment definition 
amplify/backend/auth            <-- Cognito user pool configuration
amplify/backend/function        <-- all Lambda function code are here
amplify/backend/storage         <-- DynamoDB tables definition
amplify/backend/hosting         <-- specific Cloudfront and S3 setup
```

### Lambda functions

__Oauth2/OIDC functions__

* __amplifyIdentityBrokerAuthorize__: Handle the Oauth2 flows. Is invoked behing the _/oauth2/authorize_ path on the API Gateway
* __amplifyIdentityBrokerToken__: Answer to _/oauth2/token_ standard oauth calls.
* __amplifyIdentityBrokerUserInfo__: Returns standard answer to _/oauth2/userinfo_. Needs a valid JWT token
* __amplifyIdentityBrokerExposeJWKS__: Return the oauth public key used by Cognito. It is onvoked behind /.well-known/jwks.json

__SPA backend functions__

* __amplifyIdentityBrokerStorage__: Is used by the SPA to store code_challenge and token temporarily during oauth flow execution.
* __amplifyIdentityBrokerVerifyClient__: Is used by the SPA to check if a pair _redirect_uri_ + _client_id_ is valid. It looks in the DynamoDB table amplifyIdentityBrokerClientsTable to do so

__Cognito Trigger functions__

* __amplifyIdentityBrokerCustomMessage__: Is invoked before sending any email to the user. It is associated to the [Custom message Lambda Trigger](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-custom-message.html) of the Cognito user pool.
* __amplifyIdentityBrokerMigration__: Is not invoked by default. This is just an example of how to do a migration. Can be associated to the [Migrate user trigger](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-migrate-user.html)

### Implemented auth flows

<details>
  <summary>Click to expand!</summary>
  
  
  Flow entities are:
  * __User__: the user and his browser
  * __Client Application__: (like the one from our [client demo project](https://github.com/awslabs/aws-amplify-identity-broker-client))
  * __Identity Broker__ : the main project
  * __DynamoDB__: the broker storage layer
  * __Cognito__: The Cognito service and endpoints
  * __Cognito Hosted UI__: (not visible to the user)
  * __Idp__: Any 3rd party idenity provider (in the case of federation)
  
  __PKCE flow__
  
  ![PKCE flow](Images/PKCEFlow.png "PKCE flow")
  
  __Implicit flow__
  
  ![Implicit flow](Images/ImplicitFlow.png "Implicit flow")
  
  _Note: Accordingly to the [what the Oauth2 BCP recommend](https://tools.ietf.org/html/draft-ietf-oauth-security-topics-09#section-2.1.2) we do not return the access_token in that flow but only the id_token._
  
  __IDP federation flow__
  
  ![IDP federation flow](Images/IdPFederation.png "IDP federation flow")
  
  _Note: The end of the flow (the return to the AWS Amplify broker client will be done accordingly to the client selected flow: PKCE or Implicit)_
</details>

## Contribute

PR are welcome. Any fixes or improvements. For new features, please open an issue to discuss it.

See [CONTRIBUTING](../..CONTRIBUTING.md) for more rules and information.

_Please do not update team-provider-info.json in your Pull-Requests._

## Pipelines

You are free to create your own pipeline for your environments.
If you are an AWS employee, go to the internal wiki for details.
