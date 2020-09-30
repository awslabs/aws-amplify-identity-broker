/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


const AWS                            = require('aws-sdk')
var   bodyParser                     = require('body-parser')
var   express                        = require('express')
var   awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

AWS.config.update({ region: process.env.TABLE_REGION });

const documentClient = new AWS.DynamoDB.DocumentClient();

let tableName = "amplifyIdentityBrokerCodes";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}

const path = "/client/:clientid/authtoken";

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

/*****************************************
 * HTTP Get method for get single object *
 *****************************************/

app.get(path, function(req, res) {

  let getItemParams = {
    TableName: tableName,
    IndexName: "client_id-index",
    KeyConditionExpression: "#FIELD_client_id = :client_id",
    ExpressionAttributeNames: {
      "#FIELD_client_id": "client_id"
    },
    ExpressionAttributeValues: {
      ":client_id": req.params.clientid
    },
    ScanIndexForward: true,
    Limit: 1
  }

  console.debug("getItemParams: " + JSON.stringify(getItemParams));

  documentClient.query(getItemParams,(err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: 'Could not load items: ' + err.message});
    } else {
      if (data.Item) {
        res.json(data.Item);
      } else {
        console.debug("items");
        res.json(data.Items[0].authorization_code);
      }
    }
  });
});

app.listen(3000, function() {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
