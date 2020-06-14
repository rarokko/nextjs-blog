const ddb = require('./dynamo_connect');

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