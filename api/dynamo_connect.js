var AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-2'
});

//se tiver as chaves como variavel de ambiente, usa elas
//se não, procura o profile 'beatlog' na credentials da pasta .aws
if (process.env.aws_access_key_id && process.env.aws_secret_access_key) {
  var credentials = {
    accessKeyId: process.env.aws_access_key_id,
    secretAccessKey: process.env.aws_secret_access_key
  };
} else {
  var credentials = new AWS.SharedIniFileCredentials({
    profile: 'beatlog'
  });
}

AWS.config.credentials = credentials;

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({
  apiVersion: '2012-08-10'
});

module.exports = ddb;