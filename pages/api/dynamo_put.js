// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({
  region: 'us-east-2'
});

AWS.config.credentials = credentials;


console.log(AWS.config.credentials);

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({
  apiVersion: '2012-08-10'
});

var params = {
    TableName: 'users',
    Item: {
      'id' : {S: '2'},
      'email' : {S: 'richard-san@email.com.br'},
      'password' : {S: 'tsundere'},
      'username' : {S: 'rishard'}
    }
  };
  
  // Call DynamoDB to add the item to the table
  ddb.putItem(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });