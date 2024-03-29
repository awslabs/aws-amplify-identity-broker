__[User Documentation](UserDocumentation.md)__ / [Client Developer Documentation](ClientDeveloperDocumentation.md) / [Developer Documentation](DeveloperDocumentation.md)

# User Documentation <!-- omit in toc -->

- [Presentation](#presentation)
	- [Choose your flow](#choose-your-flow)
- [Deployment](#deployment)
	- [Architecture](#architecture)
	- [Deployment Instructions](#deployment-instructions)
- [Deploying with the AWS Amplify console](#deploying-with-the-aws-amplify-console)
	- [Step 1: Environment Variables](#step-1-environment-variables)
	- [Step 2: Redirect rules](#step-2-redirect-rules)
	- [Step 3: Configure domain (mandatory)](#step-3-configure-domain-mandatory)
	- [Step 4: E2E Test (Optional)](#step-4-e2e-test-optional)
- [Deploying with Existing UserPool](#deploying-with-existing-userpool)
- [Register a client](#register-a-client)
- [CSS \& UI components customization instruction](#css--ui-components-customization-instruction)
- [Identity Providers](#identity-providers)
	- [OIDC Provider (oauth2)](#oidc-provider-oauth2)
	- [SAML Provider](#saml-provider)
	- [Social Providers](#social-providers)
	- [Step 1: Register with Facebook to get a App ID and App Secret](#step-1-register-with-facebook-to-get-a-app-id-and-app-secret)
	- [Step 2: Finish registering with Facebook](#step-2-finish-registering-with-facebook)
	- [Step 1: Register with Google to get a OAuth client ID and client secret](#step-1-register-with-google-to-get-a-oauth-client-id-and-client-secret)
	- [Step 2: Finish registering with Google](#step-2-finish-registering-with-google)
	- [Step 1: Register with Amazon to get a Client ID and Client Secret](#step-1-register-with-amazon-to-get-a-client-id-and-client-secret)
	- [Step 2: Finish registering with Amazon](#step-2-finish-registering-with-amazon)
- [Migration instructions](#migration-instructions)
- [Uninstall](#uninstall)
	- [Step 1 : stack deletion](#step-1--stack-deletion)
	- [Step 2 : delete the user pool](#step-2--delete-the-user-pool)

This document explains how to use the broker:

* How to deploy (and uninstall)
* How to customize
* How to migrate from an existing user pool system

## Presentation

The AWS Amplify Identity Broker is a centralized login solution. It is a component you can use to authenticate your user on all your websites and applications:

![Project Scope Image](./Images/SimplifiedProjectScope.png "Simplified Project Scope")

The broker will be deployed within your own AWS account and will be in your full control (see _Deployment_ section).

Using the broker your users will have the same unique identity across all your websites and applications. The broker provides Single Sign On (SSO): your users will have to login only once to be authenticated on all your services (but can have different permission levels specific to every application).

Optionally you can add external IdP (Identity Providers) to the broker. Which means that the user can sign-in using your corporate (or your customer corporate) Active Directory or using Facebook, Google or Amazon login or any OIDC and SAML IdP. Technically you can add up to 300 IdPs to your broker (limit coming from Amazon Cognito documented [here](https://docs.aws.amazon.com/cognito/latest/developerguide/limits.html)). Today user coming from any client will see the same list of IdPs but you can fork the broker project and customize the behavior to make the list dynamic and for example:

* show the corporate IdP to people accessing the broker from your office private network
* show a list of IdP specific to a customer by giving them a special URL (like a link with a get parameter flag)
* show a list of IdP specific to a client application

__Note that even if your users login in with a 3rd party IdP they will have a unique and persistent identity within the broker__ (under the hood a Amazon Cognito user pool identity).

In term of UI customization because you are in control of the source code and the deployment infrastructure you can make any change you like.
The same applies for flow customization where all the front end part are customizable using the broker and backend flows can be customized using [Amazon Cognito Lambda Triggers](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools-working-with-aws-lambda-triggers.html). The broker already leverage some of these triggers to introduce special feature like i18n (internationalization).

Finally the broker is a living open source project and your contributions are welcome if you see a missing feature that can be useful to all the broker users. Please see the  [CONTRIBUTING guide](https://github.com/awslabs/aws-amplify-identity-broker/blob/master/CONTRIBUTING.md) and the [Developer Documentation](./DeveloperDocumentation.md) if you are interested by contributing.

### Choose your flow

Selecting an authentication flow is a critical decision in term of security. We support several options to allow you connecting existing application that supports only one specific flow.

The AWS Amplify identity broker exposes two standard Oauth2 authentication flows:
* __Implicit flow__: the simpler one. It require just a link from your app and for you to read a GET parameter. This flow only returns an _id_token_ you __should not__ use an id_token to authenticate a user against a backend. (see details below)
* __PKCE flow__: the most secured flow. It will require you to generate random strings, apply some hashed and exchange information two times with the broker.

Expand the section below to see the detailed flows:

<details>
  <summary>Implicit flow</summary>

  Flow entities are:
  * __User__: the user and his browser
  * __Client Application__: (like the one from our [client demo project](https://github.com/awslabs/aws-amplify-identity-broker-client))
  * __Identity Broker__ : the main project
  * __DynamoDB__: the broker storage layer
  * __Cognito__: The Amazon Cognito service and endpoints

  __Implicit flow__

  ![Implicit flow](Images/ImplicitFlow.png "Implicit flow")

  _Note: Accordingly to the [what the Oauth2 BCP recommend](https://tools.ietf.org/html/draft-ietf-oauth-security-topics-09#section-2.1.2) we do not return the access_token in that flow but only the id_token._
</details>

<details>
  <summary>PKCE flow</summary>

  Flow entities are:
  * __User__: the user and his browser
  * __Client Application__: (like the one from our [client demo project](https://github.com/awslabs/aws-amplify-identity-broker-client))
  * __Identity Broker__ : the main project
  * __DynamoDB__: the broker storage layer
  * __Cognito__: The Amazon Cognito service and endpoints

  ![PKCE flow](Images/PKCEFlow.png "PKCE flow")

</details>

See [Client Developer Documentation](./ClientDeveloperDocumentation.md) to see how to implement a client using these flows.

## Deployment

### Architecture

The project architecture is the following:

![Project Architecture Image](Images/DeployedArchitecture.png "Project Architecture")

See __[Developer Documentation](DeveloperDocumentation.md)__ to see more detailed information on every component.

__COST__ The project architecture is Serverless, you only pay when there is user activity plus a small amount of storage (website static assets, dynamodb tables). Overall the solution is very cost effective. Amazon Cognito will be the primary source of cost, see [Amazon Cognito pricing](https://aws.amazon.com/cognito/pricing/) to estimate your costs.

### Deployment Instructions

__Prerequisites :__ In order to deploy the solution you need:
* an AWS account
* the AWS CLI installed with administrator credentials ([installation-link](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html))
* the AWS Amplify CLI ([installation link](https://docs.amplify.aws/cli/start/install)), install and configure.
* this project will need some permissions in addition to what you get from ```AdministratorAccess-Amplify``` policy. Add the following permissions to an inline policy.

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "kms:CreateKey",
                "kms:CreateAlias",
                "kms:CreateGrant",
                "kms:Decrypt",
                "kms:DescribeKey",
                "kms:EnableKeyRotation",
                "kms:Encrypt",
                "kms:PutKeyPolicy",
                "kms:TagResource",
                "kms:ScheduleKeyDeletion",
                "kms:DeleteAlias",
                "dynamodb:DescribeContributorInsights",
                "dynamodb:DescribeKinesisStreamingDestination",
                "lambda:GetFunctionCodeSigningConfig",
                "s3:GetBucketPolicy",
                "cloudfront:ListCloudFrontOriginAccessIdentities",
                "sts:GetCallerIdentity"
            ],
            "Resource": "*"
        }
    ]
}
```
__1. Clone the project or fork it__

```
git clone git@github.com:awslabs/aws-amplify-identity-broker.git
```

__Note__: _If you want to save your modification and settings under Git your should [Fork](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo) this repository and work from your fork. You can also start with a clone, fork and add your fork as another remote._

__2. Install all the dependencies__

```
cd aws-amplify-identity-broker
npm install
```

__3. Set your Hosted UI Domain Name__

To set the Hosted UI domain name go to [/amplify/backend/auth/amplifyIdentityBrokerAuth/parameters.json](https://github.com/awslabs/aws-amplify-identity-broker/blob/amplify/backend/auth/amplifyIdentityBrokerAuth/parameters.json#L70) and edit the `hostedUIDomainName` property. Be default it is "amplifyidbroker". When created, the Hosted UI domain name will take the form `https://{hostedUIDomainName}-{environment}.auth.{region}.amazoncognito.com`

__WARNING:__ _The Cognito domain name has to be __unique among all AWS customers__ in your selected region. Conflicting domain name is a cause of deployment failure._

__4. Set your User Pool's Federated Social Identity Providers__

To set the social IdPs included in your user pool go to [/amplify/backend/auth/amplifyIdentityBrokerAuth/parameters.json](https://github.com/awslabs/aws-amplify-identity-broker/blob/master/amplify/backend/auth/amplifyIdentityBrokerAuth/parameters.json#L71) and edit `authProvidersUserPool` and `hostedUIProviderMeta` arrays. By default Facebook, Google, and LoginWithAmazon are configured but each can be removed based on which providers you want to allow users to sign in with. _If you add them again after deployment you'll just have to redo the step 6, 7 and 8._

If you don't want any social provider just make the arrays `authProvidersUserPool` and `hostedUIProviderMeta` empty. For example:

```
"authProvidersUserPool": [],
"hostedUIProviderMeta": "[]",
```

When initializing your environment in Step 6 you will be prompted for a Client ID and Client secret for each social provider you included. You can get these by completing Step 1 of the provided instructions for each social provider found [here](#social-providers)



__5. Delete the AWS demo environment file__

Remove the file with the AWS dev & demo environment (amplify will create a new file with your environment information later)

```
rm -f ./amplify/team-provider-info.json
```

__6. Initialize your environment__

_You need to have the AWS cli and AWS credentials in place before running this_

```
amplify init
```
You will be prompted for a name for your environment.

If you defined any at step 4, you will be also be asked for a Client ID and Client secret for each social provider you included (If you don't have this information yet, you can enter "123456" for each value and edit later see [section Identity Providers](./UserDocumentation.md#identity-providers) for details)

__7. Configure config-overrides.js__

The file _config-overrides.js_ is used at compile time to configure the Single Page App. Edit the file and add the settings for your environment:

```
case "<your-amplify-environment-name>": localConfig = {
            "providers": ["<a-corporate-SSO>", "Facebook", "LoginWithAmazon", "Google"]
};
```

If you do not need to federate just let the list empty:

```
case "<your-amplify-environment-name>": localConfig = {
            "providers": []
};
```

The names entered has to match what the [Amazon Cognito documentation](https://docs.aws.amazon.com/cognito/latest/developerguide/authorization-endpoint.html) ask for `identity_provider`. See below on the page detail about how to setup federation for SAML, OIDC, Facebook, Google and Amazon as IdPs.

__8. Publish the app__

This command will create all the backend resources and the hosting bucket plus cloudfront distribution that will host the broker:

```
amplify publish
```

__9. Setup your own domain (optional)__

If you use Cloudfront directly (by default), you should setup your own domain following [this guide](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-https-alternate-domain-names.html).

If you plan to use AWS Amplify Console as a CI/CD pipeline to deploy, skip that step and go to _Deploying with the AWS Amplify console_ section.

Once your domain associated with the broker, you need to indicate it inside _amplify/team-provider-info.json_:

```
"your-env-name": {
    "awscloudformation": {
      ...
    },
    "categories": {
      "auth": {
      ...
      },
      "function": {
        "amplifyIdentityBrokerPostDeployment": {
          "hostingDomain": "https://your-own-domain.com"  <-- Here indicate the domain your Broker uses
        },
        ...
      }
    }
  }
```

After a change on the _hostingDomain_ in _amplify/team-provider-info.json_, if you already deployed the project the Amplify CLI will not detect your change automatically. You will need to do the following command to propagate your change:

```
amplify push --force
```

_To verify if the change have been propagated you can open one of the AWS Lambda within teh AWS console and look at the value of the environment variable `HOSTING_DOMAIN`_



## Deploying with the AWS Amplify console

### Step 1: Environment Variables

If you want to use the AWS Amplify console as your CI/CD pipeline to automate the deployment of the solution, you will need to set the following environment variable inside your AWS Amplify console app: (You would need to add only the variables corresponding to the social platforms you have configured during the Auth CLI setup):

__AMPLIFY_FACEBOOK_CLIENT_ID__

__AMPLIFY_FACEBOOK_CLIENT_SECRET__

__AMPLIFY_GOOGLE_CLIENT_ID__

__AMPLIFY_GOOGLE_CLIENT_SECRET__

__AMPLIFY_AMAZON_CLIENT_ID__

__AMPLIFY_AMAZON_CLIENT_SECRET__

__Note:__ This variable requirement is a temporary workaround that may disappear in the future. We'll update this documentation accordingly.

### Step 2: Redirect rules

Once the environment is created you'll need to add the necessary redirect rules manually. On the AWS console, go to _AWS Amplify_, select your app, on the left menu click on _Rewrites and redirects_ and clic _Edit_ to input the following values:

| First Header           | Second Header                               | Type |
| ---------------------- | ------------------------------------------- | ---- |
| /oauth2/<*>            | ...api-gateway-url.../oauth2/<*>            | 200  |
| /storage               | ...api-gateway-url.../storage               | 200  |
| /.well-known/jwks.json | ...api-gateway-url.../.well-known/jwks.json | 200  |
| /verifyClient          | ...api-gateway-url.../verifyClient          | 200  |
| /clients               | ...api-gateway-url.../clients               | 200  |
| /accountConfirmation   | ...api-gateway-url.../accountConfirmation   | 200  |
| /dashboard             | /index.html                                 | 200  |
| /settings              | /index.html                                 | 200  |
| /logout                | /index.html                                 | 200  |
| /<*>                   | /index.html                                 | 404  |

__Note:__ The `...api-gateway-url...` needs to be replaced by the entry point url of the API Gateway associated with your broker. You can find the value by going to the Amazon API Gateway service or by looking at the AWS CloudFormation service and reading at the output parameter `RootUrl` of the template `amplify-amplify-identity-broker-<env>-xxxxxx-apiamplifyIdentityBrokerApi-XXXXXXXXXXX`.

> __IMPORTANT__ The order of the redirect rules is important!

Your setup should look like that:

![AWS console custom rules](Images/custom-rules.png "AWS console custom rules")

See [the documentation](https://docs.aws.amazon.com/amplify/latest/userguide/redirects.html) for more info about how AWS Amplify console rules works.

> __Why do we need this?__ We need to add the redirect rules because when the AWS Amplify Console service deploys the broker he doesn't deploy the S3 and Cloudfront hosting but use a managed hosting. Therefore the behavior we set through the CloudFormation templates of this project are not applied and we need to reproduce the same settings within the AWS Amplify Console service context.

### Step 3: Configure domain (mandatory)

If you plan to configure your custom domain the process follow instructions from [this guide](https://docs.aws.amazon.com/amplify/latest/userguide/custom-domains.html).

> __NOTE:__ _If you want __do not want__ your custom domain to use the AWS Amplify console provided domain `https://master.XXXXXXXXXX.amplifyapp.com/` you have to tell the broker anyway._

Once done indicate your domain (or the AWS Amplify provided one) to the broker by updating your environment configuration on _amplify/team-provider-info.json_:

```
"your-env-name": {
    "awscloudformation": {
      ...
    },
    "categories": {
      "auth": {
      ...
      },
      "function": {
        "amplifyIdentityBrokerPostDeployment": {
          "hostingDomain": "https://your-own-domain.com"  <-- Here indicate the domain your Broker uses
        },
        ...
      }
    }
  }
```

After a change on the _hostingDomain_ in _amplify/team-provider-info.json_, if you already deployed the project the Amplify CLI will not detect your change automatically. You will need to do the following command to propagate your change:

```
amplify push --force
```

_To verify if the change have been propagated you can open one of the AWS Lambda within the AWS console and look at the value of the environment variable `HOSTING_DOMAIN`_

### Step 4: E2E Test (Optional)

This project is setup with End-to-end Testing with [Cypress](https://docs.aws.amazon.com/amplify/latest/userguide/running-tests.html).

If you use Amplify CICD Integration, you must either setup necessary step for testing or disable testing. You may only run test on specific branch.

__Option 1: Setup Testing__

1. Visit Cognito Console.
2. Create a test user.
3. Login with the test user and set the password.
4. Add the test user email and password as `CYPRESS_EMAIL` and `CYPRESS_PASSWORD` in Amplify Environment Variable.
5. When test locally, run `npx cypress run --env EMAIL=<email>,PASSWORD=<password>`

__Option 2: Disable Testing__

1. Set Amplify Environment Variable `USER_DISABLE_TESTS` to `true` on branch. Visit [Amplify Documentation](https://docs.aws.amazon.com/amplify/latest/userguide/running-tests.html#disabling-tests) for more detail.


## Deploying with Existing UserPool

You may also choose to deploy this application with existing UserPool.

> __Important Note:__ Some immutable setting of Existing UserPool may not align with this application. For example, Custom Attributes cannot be modified or deleted once created. Test it carefully with equivalent setting in development environment.
>

To deploy this application with existing UserPool follow the procedure below instead of normal deployment.

1. Deploy AmplifyIdentityBroker without Cognito
    1. Create Cognito Client in existing Cognito
    2. Delete `amplify/team-provider-info.json`
    3. Update `amplify/backend/backend-config.json`
        1. Add property `"serviceType": "imported"` to `amplifyIdentityBrokerAuth`
    4. Delete `amplify/backend/auth/amplifyIdentityBrokerAuth/amplifyIdentityBrokerAuth-cloudformation-template.yml`
    5. Run `amplify init`
    6. Run `amplify push`
2. Add required setting to existing Cognito following settings in `amplify/backend/auth/amplifyIdentityBrokerAuth/amplifyIdentityBrokerAuth-cloudformation-template.yml` (**This step may affect existing application. Test it carefully with development environment**)
    1. Add Custom Attributes (Boolean attributes cannot be created with console, so use SDK or CLI)
    2. Associate Lambda Triggers
    3. Check other settings are set correctly (i.e. MFA, CognitoDomain, callback URLs, ...)



## Register a client

To use the identity broker you must:
* create a Cognito App and configure it
* (only for if you want the SSO dashboard) register your app in the Amazon DynamoDB table `amplifyIdentityBrokerClients`

So the very first operation is to open your AWS console and to go to Amazon Cognito and open the UserPool associated with your broker. On the menu left go to _App clients_ then at the bottom of the page clic on the link _Add another app client_. Enter a name (the exact name doesn't mater this is only for you), uncheck _Generate client secret_ and clic on the button _Create app client_:

![App Client creation](Images/ClientAppCreation.PNG "App Client creation")

_At this point make sure you take note of the __client id__. This client id is very important: you need to give it to the admin of the client application._

Once the app client created you need to configure it. On the left menu go to _App client settings_, look for your app client and do the following settings:

* Add your client redirect_uri (the one from your client website or app) and __add also the URL of your broker as a redirect_uri__
* Add your client logout URI (the one from your client website or app) and __add also the URL + /logout of your broker as a logout uri__
* Select the identity providers you want the broker to show when a user will come from that client app to login (you don't have to check all)
* Select Authorization code grant
* Select the scope you want to retrieve in the access_token delivered to this client app

Your setting page should look like this:

![App Client creation](Images/ClientAppSettings.PNG "App Client creation")

__Registering an app for the dashboard__

You don't need to do this if you do not want to use the SSO dashboard.

On the AWS console, go to Amazon DynamoDB and look at the table named  `amplifyIdentityBrokerClients-yourAmplifyEnv`. Then click on _Items_ and _Create Item_ button.

Enter an item like:

```
{
  "client_id": "your-cognito-app-clien-id",
  "client_name": "App name to be displayed on Dashboard",
  "logback_uri": "https://yourclient.url.for.auto/login"
}
```

Click _Create_, your page should look like this:

![Clients Table Example](Images/ClientsTableExample.png "Clients Table Example")

A _logback_uri_ is just a URL on your client app that start immediatly a PKCE flow (exactly has if the user had clicked on the login button).

## CSS & UI components customization instruction

The Broker code is based on _React_, _aws-amplify_ and _@aws-amplify/ui-react_. While you can customize the CSS, JS and HTML anyway you want, we provide here several tips to make your change more efficient and easier to maintain.

We use CSS Variables to setup the color of the project.

In the file _src/index.css_ we set the root color like that:

```
:root{

  --amplify-primary-color: #008000;
  --amplify-primary-tint: #0000FF;
  --amplify-primary-shade: #008000;
}
```

For more option on the AWS Amplify UI component look at the [Documentation](https://docs.amplify.aws/ui/customization/theming/q/framework/react)

We've define all CSS extra properties in _src/index.css_, look at this file before any override.

## Identity Providers

The setup of federation with 3rd party Identity Providers has to be done within the Amazon Cognito User Pool associated with your running broker and a small change is to make on the broker itself to let him aware of the additional IdPs to display (see PREREQUISITE down below).

The changes made against the Amazon Cognito User Pool should be done within the AWS console.

__PREREQUISITE__:

To add identity providers, you need to insert these providers under the file _config-overrides.js_ which is at the root of the project.
You have to add the settings on the environment you like to modify.

Example:

```
        case "production": localConfig = {
            "providers": ["Provider1", "Provider2", "LoginWithAmazon", "Facebook", "Google"]
          };
            break;
```

Be exact with the name of your OIDC and SAML providers or strings that match what the [Amazon Cognito documentation](https://docs.aws.amazon.com/cognito/latest/developerguide/authorization-endpoint.html) is asking `identity_provider` for social federation.

Note that the label that appear in the button is displayed using the i18n AWS Amplify system. If you want to change the name edit the file _src/strings.js_ and create label that match your provider name.
Example:

```
        Provider1: "Sign In with first provider",
        Provider2: "Sign In with another provider",
        AMAZON_SIGNIN: "Sign In with Amazon",
        GOOGLE_SIGNIN: "Sign In with Google",
        FACEBOOK_SIGNIN: "Sign In with Facebook",
```

See next sections for specific provider steps.

__AFTER ANY IDP ADDITION__:

After adding any IdP, make sure you __Enable__ your provider on the app settings of the broker inside the Amazon Cognito user pool.
On the AWS console, on the Amazon Cognito User Pool page, go on `App settings` and check the box you want to activate.

Your settings should look like something like this:

![Active IdP settings](Images/active-idp-app-settings.png "Active IdP settings")

### OIDC Provider (oauth2)

Follow the [Amazon Cognito User Pool OIDC IDP documentation](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-oidc-idp.html). Remember the name you choose for your provider, you have to use it inside _config-overrides.js_ and _src/strings.js_ as explained before.

### SAML Provider

Follow the [Amazon Cognito User Pool SAML IDP documentation](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-saml-idp.html). Remember the name you choose for your provider, you have to use it inside _config-overrides.js_ and _src/strings.js_ as explained before.

### Social Providers

Social Provider instructions taken from [Amazon Cognito Documentation](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-social-idp.html).

<details>
  <summary>Facebook</summary>

### Step 1: Register with Facebook to get a App ID and App Secret

1. Create a developer account with [Facebook](https://developers.facebook.com/docs/facebook-login).
2. [Sign in](https://developers.facebook.com) with your Facebook credentials.
3. From the __My Apps__ menu, choose __Create New App.__


![Facebook-CreateApp](Images/FacebookSetupInstructions/Facebook-CreateApp.png "Facebook-CreateApp")


4. Select __For Everything Else,__ give your Facebook app a name and choose __Create App ID.__


![Facebook-CreateAppID](Images/FacebookSetupInstructions/Facebook-CreateAppID.png "Facebook-CreateAppID")


5. On the left navigation bar, choose __Settings__ and then __Basic__.
6. Note the __App ID__ and the __App Secret.__ You will use them when running `amplify init`

### Step 2: Finish registering with Facebook

7. Choose __+ Add Platform__ from the bottom of the page.
8. Choose __Website__
9. Under __Website,__ type your user pool domain with the /oauth2/idpresponse endpoint into Site URL.


![Facebook-WebsitePlatform](Images/FacebookSetupInstructions/Facebook-WebsitePlatform.png "Facebook-WebsitePlatform")


10. Choose __Save changes__
11. Type your user pool domain into __App Domains__


![Facebook-AppDomains](Images/FacebookSetupInstructions/Facebook-AppDomains.png "Facebook-AppDomains")


12. Choose __Save changes.__
13. From the navigation bar choose __Products__ and then __Set up__ from __Facebook Login.__
14. From the navigation bar choose __Facebook Login__ and then __Settings.__
Type your redirect URL into __Valid OAuth Redirect URIs.__ It will consist of your user pool domain with the /oauth2/idpresponse endpoint.


![Facebook-OauthRedirectURI](Images/FacebookSetupInstructions/Facebook-OauthRedirectURI.png "Facebook-OauthRedirectURI")


15. Choose __Save changes.__

</details>

<details>
  <summary>Google</summary>

### Step 1: Register with Google to get a OAuth client ID and client secret

1. Create a [developer account with Google.](https://developers.google.com/identity)
2. [Sign in](https://console.developers.google.com) with your Google credentials.
3. Choose __Create Project__


![Google-CreateProject](Images/GoogleSetupInstructions/Google-CreateProject.png "Google-CreateProject")


4. Type in a project name and choose __Create__
5. On the left navigation bar, choose __OAuth consent screen__
6. Select your User Type and choose __Create__


![Google-OauthConsent](Images/GoogleSetupInstructions/Google-OauthConsent.png "Google-OauthConsent")


7. Type in an application name and choose __Save__
8. On the left navigation bar, choose __Credentials__
9. Create your OAuth 2.0 credentials by choosing __OAuth client ID__ from the __Create credentials__ drop-down list.


![Google-CreateCredentials](Images/GoogleSetupInstructions/Google-CreateCredentials.png "Google-CreateCredentials")


10. Choose __Web application.__ and type in a name for your OAuth 2.0 client
11. Choose __Create.__
12. Note the __OAuth client ID__ and __client secret.__ You will use them when running `amplify init`

### Step 2: Finish registering with Google

13. Click edit on the OAuth 2.0 Client IDs you created in Step 1
14. Type your user pool domain into __Authorized JavaScript origins.__
15. Type your user pool domain with the __/oauth2/idpresponse__ endpoint into __Authorized Redirect URIs.__


![Google-CreateOauthClientID](Images/GoogleSetupInstructions/Google-CreateOauthClientID.png "Google-CreateOauthClientID")

16. Choose __Save__

</details>

<details>
  <summary>Amazon</summary>

### Step 1: Register with Amazon to get a Client ID and Client Secret

1. Create a [developer account with Amazon.](https://developer.amazon.com/login-with-amazon)
2. [Sign in](https://developer.amazon.com/dashboard) with your Amazon credentials.
3. You need to create an Amazon security profile to receive the Amazon client ID and client secret. Choose __Apps and Services__ from navigation bar at the top of the page and then choose __Login with Amazon.__
4. Choose __Create a Security Profile.__

![Amazon-CreateSecurityProfile](Images/AmazonSetupInstructions/Amazon-CreateSecurityProfile.png "Amazon-CreateSecurityProfile")


5. Type in a __Security Profile Name,__ a __Security Profile Description,__ and a __Consent Privacy Notice URL.__
6. Choose __Save.__
7. Choose __Client ID__ and __Client Secret__ to show the client ID and secret. You will use them when running `amplify init`

### Step 2: Finish registering with Amazon

8. Hover over the gear and choose __Web Settings,__ and then choose __Edit.__
9. Type your user pool domain into __Allowed Origins.__
10. Type your user pool domain with the __/oauth2/idpresponse__ endpoint into __Allowed Return URLs.__


![Amazon-WebSettings](Images/AmazonSetupInstructions/Amazon-WebSettings.png "Amazon-WebSettings")


11. Choose __Save.__

</details>

## Migration instructions

__DISCLAIMER__:
Migrating credentials from an existing system to Amazon Cognito comes with the risk that these credentials have been exposed in the past. For better security it is recommended to force the users to recreate passwords. The documentation below shows how to migrate users and credentials for learning purpose only.

In this project we provide an example of a Lambda function that migrate users one at a time. For our demo we migrate the users from a _legacy_ Amazon Cognito user pool to the broker user pool. If your pool of user is not Amazon Cognito you'll have to adapt the source code to match with your system APIs.

[Lambda User Migration Code](https://github.com/awslabs/aws-amplify-identity-broker/blob/master/amplify/backend/function/amplifyIdentityBrokerMigration/src/index.js)

[Migration Documentation](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-migrate-user.html#cognito-user-pools-lambda-trigger-syntax-user-migration)

[Cognito SDK Documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html)


__Linking the Trigger__:
To use the user migration that is labeled `amplifyIdentityBrokerMigration`, the following setting needs to be enable

1. In the AWS console go to _Amazon Cognito_ -> _User Pool_ -> _brokeruserpool

2. On the left side menu navigate to Triggers


  ![Cognito Menu](Images/CognitoMenuTrigger.png)

3. In the User Migration click the dropdown list and select Lambda function, if you are using the pre-built one with this project it should be label `amplifyIdentityBrokerMigration-YourENV`


  ![Cognito Menu](Images/MigrationTrigger.png)

__Important__:
Your app sends the username and password to Amazon Cognito. If your app has a native sign-in UI and uses the Amazon Cognito Identity Provider SDK, your app must use the USER_PASSWORD_AUTH flow, in which the SDK sends the password to the server (your app must not use the default USER_SRP_AUTH flow since the SDK does not send the password to the server in the SRP authentication flow). The USER_PASSWORD_AUTH flow is enabled by setting AuthenticationDetails.authenticationType to "USER_PASSWORD".
 [Switch Authentication Flows](https://docs.amplify.aws/lib/auth/switch-auth/q/platform/js)

 If you like to set a migration flow for a specific environment, follow the these steps:

 1. After your calling your imports in src/App.js of your react frontend, the use the following example.

    Example:
    ```
    Amplify.configure({...awsconfig,
      Auth: {
        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        authenticationFlowType: Config.authenticationFlowType !== undefined ? Config.authenticationFlowType : "USER_SRP_AUTH",
      },
    });
    ```
    This will detect if your authenticationFlowType have been set or not yet, if the authenticationFlowType has not been set then USER_SRP_AUTH will be the assigned flow.

  2. Lastly we need to set the "USER_PASSWORD" flow to the desired environment, navigate to config-overrides.js in the root folder and set code with the following example.

      Example:
      ```
      case "Your-ENV": localConfig = {
            // This is added to any ENV that want to use User-Migration, the authenication flow type need to be set to USER_PASSWORD_AUTH from default(USER_SRP_AUTH)
            "authenticationFlowType": "USER_PASSWORD_AUTH",
        };
            break;
      ```
      This will set your specific environment to USER_PASSWORD_AUTH.

## Uninstall

> __Important note:__ the stack deletion will not delete all the resources to prevent accidental data loss. Especially, the UserPool won't be deleted by a stack deletion. If you really want to delete the user pool do the Step2 after the Step1.

### Step 1 : stack deletion

To delete the broker, you have to run the following command:
```
amplify delete
```

Or if you have multiple environments in your _amplify/team-provider-info.json_ you will run multiple time commands like:
```
amplify env remove <name-of-your-env>
```
_Note: You cannot delete an environment currently checkout, you'll have to switch env before with `amplify env checkout <my-other-env>`. At anytime you can see the list of env by typing `amplify env list`_

> __Possible cause of failure:__
> * __S3 bucket not empty:__ To solve this, in the AWS console, go to Amazon S3, open the S3 bucket that fail to delete, check all items and click delete. Then redo the stack deletion (using the AWS Amplify CLI or AWS CloudFormation)

__Alternative method: AWS Cloudformation__

Alternatively of using the AWS Amplify CLI is to go to AWS CloudFormation in the region where you have created the environment and deleting the root stack. This  ensures that all the resources created by that stack are removed.

__AWS Amplify console__

If you deployed your environment through the AWS Amplify console, then you should delete it from the AWS Amplify console.

### Step 2 : delete the user pool

> __WARNING:__ Doing this will delete all your user identities and credentials. There is no way to restore this after (the AWS support can't do it neither). Make sure you know what you are doing before proceeding.

On the AWS Console, go to Amazon Cognito service page, then go to _User Pool_, select the user pool you want to delete anc click on _Delete pool_ button at the top right corner:

  ![Delete UserPool](Images/deletepool.png)
