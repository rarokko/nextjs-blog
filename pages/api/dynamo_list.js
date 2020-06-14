// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-east-2'});

var credentials = new AWS.SharedIniFileCredentials({profile: 'beatlog'});
AWS.config.credentials = credentials;

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

// Call DynamoDB to retrieve the list of tables
ddb.listTables({Limit: 10}, function(err, data) {
  if (err) {
    console.log(err);
    console.log("Error", err.code);
  } else {
    console.log("Table names are ", data.TableNames);
  }
});