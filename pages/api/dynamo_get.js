const ddb = require('./dynamo_connect');

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