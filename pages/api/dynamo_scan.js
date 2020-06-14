export function listUsers() {

  return new Promise((resolve, reject) => {  
    
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
      TableName: 'users'
    };
  
    ddb.scan(params, (err, data) => {
      if (err) {
        console.log("Error", err);
      } else {
        resolve(data.Items);
        console.log("Success", data.Items);
      }
    })
  })



}