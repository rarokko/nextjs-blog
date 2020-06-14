const ddb = require('./dynamo_connect');

// Call DynamoDB to retrieve the list of tables
ddb.listTables({Limit: 10}, function(err, data) {
  if (err) {
    console.log(err);
    console.log("Error", err.code);
  } else {
    console.log("Table names are ", data.TableNames);
  }
});