import { gql } from "apollo-server-express";

export const typeDefs = gql`
  directive @isAuth on FIELD_DEFINITION
  directive @isEmail on ARGUMENT_DEFINITION | FIELD_DEFINITION

  type User {
    id: String! @isEmail
    nickName: String!
    jwt: String
  }

  type Response {
    status: Int!
    message: String!
    body: String
  }

  type Query {
    retrieveUser(id: String): User
    retrievePortfolio(id: String): Response
  }

  type Mutation {
    login(id: String , passwd: String): String
    signup(id: String @isEmail, passwd: String, nickName: String): Response
    signout: Response @isAuth
    addPortfolio: Response @isAuth
    addTitle: Response @isAuth
    addBody: Response @isAuth
  }
`;
