import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '../../models/User';

const ddb = require('./dynamo_connect');

export function listUsers(): Promise<Array<User>> {   
  return new Promise((resolve, reject) => {
  
    var params = {
      TableName: 'users'
    };
  
    ddb.scan(params, (err: any, data: any) => {
      if (err) {
        console.log("Error", err);
      } else {
        let users: Array<User> = data.Items;
        resolve(users);
      }
    });
    
  })
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const users: Array<User> = await listUsers();
  res.status(200).json(users);
}
