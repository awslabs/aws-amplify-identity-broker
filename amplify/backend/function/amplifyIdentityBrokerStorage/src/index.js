/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_AMPLIFYIDENTITYBROKERCODESTABLE_ARN
	STORAGE_AMPLIFYIDENTITYBROKERCODESTABLE_NAME
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');

var docClient = new AWS.DynamoDB.DocumentClient();
var codesTableName = process.env.STORAGE_AMPLIFYIDENTITYBROKERCODESTABLE_NAME

exports.handler = async (event) => {
    console.log(event);
    if (event.body) {
        console.log(event.body);
        var json = JSON.parse(event.body);
        console.log(json);
    }

    return {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda amplify/backend/function/amplifyIdentityBrokerStorage/src/index.js!'),
    };
};
