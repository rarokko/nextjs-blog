import { NextApiRequest, NextApiResponse } from "next";
import { User } from '../../models/User';
import DynamoFactory from '../../lib/DynamoFactory'

const ddb = require('./dynamo_connect');

function putUser(user: User) {

  return new Promise((resolve, reject) => {

    let requiredParams = ['username', 'password', 'id', 'email'];
    let validateRequiredFields = DynamoFactory.validateRequiredFields(requiredParams, user);

    if (!validateRequiredFields) {
      reject({ message: "Invalid Fields" });
      return;
    };

    user = new User(user);

    var params = {
      TableName: 'users',
      Item: user.getAsDynamoObject(),
      ConditionExpression: `attribute_not_exists(id)`
    };
    
    ddb.putItem(params, function(err: any, data: any) {
      if (err) {
        console.log("Error: " + err);
        reject(err);
      } else {
        console.log("Success: " + JSON.stringify(data));
        resolve(data);
      }
    });

  })


}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  putUser(req.body)
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => {
    res.status(400).json(err);
  })
}