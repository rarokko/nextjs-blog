import { User } from "../../models/User";
import { NextApiRequest, NextApiResponse } from "next";

const ddb = require('./dynamo_connect');

function getUser(user: User) {

  return new Promise((resolve, reject) => {

    user = new User(user);

    var params = {
      TableName: 'users',
      Key: {
        'id': {
          S: user.id
        }
      }
    };
    
    // Call DynamoDB to read the item from the table
    ddb.getItem(params, function (err: any, data: any) {
      if (err) {
        console.log("Error", err);
        reject(err);
      } else {
        console.log("Success", data.Item);
        resolve(data.Item);
      };
    });

  });

}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  getUser(req.body)
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => {
    res.status(400).json(err);
  })
}