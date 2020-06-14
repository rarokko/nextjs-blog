import { NextApiRequest, NextApiResponse } from "next";

const ddb = require('./dynamo_connect');

function listTables(): Promise<Array<String>> {

  return new Promise((resolve, reject) => {
    
    ddb.listTables({Limit: 10}, function(err: any, data: any) {
      if (err) {
        console.log("Error", err.code);
        reject(err);
      } else {
        resolve(data.TableNames);
      }
    });

  });
}


export default async (req: NextApiRequest, res: NextApiResponse) => {
  listTables()
  .then((data: Array<String>) => {
    res.status(200).json(data);
  })
  .catch((err: any) => {
    res.status(400).json(err);
  })
}
