/* Amplify Params - DO NOT EDIT
    AUTH_AMPLIFYIDENTITYBROKERAUTH_USERPOOLID
    AUTH_AMPLIFYIDENTITYBROKERAUTH_APPCLIENTID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

exports.handler = async (event) => {
    console.log("UserPoolID = " + process.env.AUTH_AMPLIFYIDENTITYBROKERAUTH_USERPOOLID);
    console.log("AppClientID = " + process.env.AUTH_AMPLIFYIDENTITYBROKERAUTH_APPCLIENTID);
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
