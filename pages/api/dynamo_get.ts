import { User } from "../../models/User";
import { NextApiRequest, NextApiResponse } from "next";

const { ApolloServer, gql } = require('apollo-server-micro');
const ddb = require('./dynamo_connect');

export const config = { api: { bodyParser: false } };

function getUser(user: any) {

  return new Promise((resolve, reject) => {

    user = new User(user);

    var params = {
      TableName: 'users',
      Key: {
        'id':  user.id || "1"
      }
    };
    
    // Call DynamoDB to read the item from the table
    ddb.get(params, function (err: any, data: any) {
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

const typeDefs = gql`
  type Query {
    user(id: String!): User
  }

  type User {
    id: String!
    username: String
    email: String
    password: String
  }
`;

const resolvers = {
  Query: {
    async user(parent, args, context) {
      return await getUser(args);
    }
  },
}

const apolloServer = new ApolloServer({ typeDefs, resolvers });
export default apolloServer.createHandler({ path: '/api/dynamo_get' })



// function getUser(user: any) {

//   return new Promise((resolve, reject) => {

//     user = new User(user);

//     var params = {
//       TableName: 'users',
//       Key: {
//         'id': {
//           S: user.id || "1"
//         }
//       }
//     };
    
//     // Call DynamoDB to read the item from the table
//     ddb.getItem(params, function (err: any, data: any) {
//       if (err) {
//         console.log("Error", err);
//         reject(err);
//       } else {
//         console.log("Success", data.Item);
//         resolve(data.Item);
//       };
//     });

//   });

// }

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   getUser(req.body)
//   .then(data => {
//     res.status(200).json(data);
//   })
//   .catch(err => {
//     res.status(400).json(err);
//   })
// }