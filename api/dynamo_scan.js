const ddb = require('./dynamo_connect');

export function listUsers() {

  return new Promise((resolve, reject) => {
  
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