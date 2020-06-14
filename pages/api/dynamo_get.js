// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({
  region: 'us-east-2'
});

var credentials = new AWS.SharedIniFileCredentials({
  profile: 'beatlog'
});
AWS.config.credentials = credentials;

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({
  apiVersion: '2012-08-10'
});

var params = {
  TableName: 'users',
  Key: {
    'id': {
      S: process.argv[2] || "1"
    }
  }
};

// Call DynamoDB to read the item from the table
ddb.getItem(params, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Item);
  }
});