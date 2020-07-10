/* Amplify Params - DO NOT EDIT
    AUTH_amplifyIdentityBrokerAuth_USERPOOLID
    AUTH_amplifyIdentityBrokerAuth_APPCLIENTID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

exports.handler = async (event) => {
    console.log("UserPoolID = " + process.env.AUTH_amplifyIdentityBrokerAuth_USERPOOLID);
    console.log("AppClientID = " + process.env.AUTH_amplifyIdentityBrokerAuth_APPCLIENTID);
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
