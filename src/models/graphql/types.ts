import { gql } from "apollo-server-express";

export const typeDefs = gql`
  directive @isAuth on FIELD_DEFINITION
  # directive @isAuthUser on FIELD_DEFINITION

  type User {
    id: ID!
    nickName: String! @isAuth
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
    login(id: String, passwd: String): String
    signup(id: String, passwd: String, nickName: String): Response
    signout: Response @isAuth
    addPortfolio: Response @isAuth
    addTitle: Response @isAuth
    addBody: Response @isAuth
  }
`;
