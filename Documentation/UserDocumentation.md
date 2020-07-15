# User Documentation

This document explains how to use the broker:

* How to deploy
* How to customize
* How to migrate from an existing user pool system

## Presentation and feature overview

### Example use cases 

### Choose your flow

## Deployment

### Architecture

The project architecture is the following:

![Projet Architecture Image](Images/DeployedArchitecture.png "Projet Architecture")

See __[Developer Documentation](DeveloperDocumentation.md)__ to see more detailed information on every component. 

__COST__ The project architecture is Serverless, you only pay when there is user activity plus a small amount of storage (website static assets, dynamodb tables). Overall the solution is very cost effective. Amazon Cognito will be the primary source of cost, see [Amazon Cognito pricing](https://aws.amazon.com/cognito/pricing/) to estimate your costs.

### Deployment instruction

__Prerequisites :__ In order to deploy the solution you need:
* an AWS account
* the AWS CLI installed with administrator credentials (instruction-link)
* the Amplify CLI (instruction-link)

1. Clone the project or fork it

2. Select the deployment options

TBD

2. Create your own environement

```
amplify init
```

3. 

__Setup your own domain__

## Register a client
To use the indentity broker you must register a client_id and redirect_url with the `amplifyIdentityBrokerClients` DynamoDB table. These values are passed as query string paramters when a request is made to the /oauth2/authorize endpoint and then checked agaisnt the table.

To register your client, create an item in the `amplifyIdentityBrokerClients` DynamoDB with a client_id and the redirect_url of your client application. Below is an example of a registered client

![Clients Table Example](Images/ClientsTableExample.png "Clients Table Example")


## CSS & UI components customization instruction

## MFA customization

## IAM credentials emmission 

## Setup social instructions

## Active directory instructions

## Migration instructions
