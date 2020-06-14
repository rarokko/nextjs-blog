export function listUsers() {

  return new Promise((resolve, reject) => {  

    //process.env.aws_access_key_id
    //process.env.aws_secret_access_key
    
    // Load the AWS SDK for Node.js
    var AWS = require('aws-sdk');
    // Set the region 
    AWS.config.update({
      region: 'us-east-2'
    });
  
    // var credentials = new AWS.SharedIniFileCredentials({
    //   profile: 'beatlog'
    // });
    // AWS.config.credentials = credentials;

    AWS.config.credentials = {
      accessKeyId: process.env.aws_access_key_id,
      secretAccessKey: process.env.aws_secret_access_key
    };

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