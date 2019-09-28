import { gql } from "apollo-server-express";

export const typeDefs = gql`
  directive @isAuth on FIELD_DEFINITION
  directive @isEmail on ARGUMENT_DEFINITION | FIELD_DEFINITION

  type User {
    id: String! @isEmail
    nickname: String!
    jwt: String
  }

  type Portfolio {
    title: String
    body: String
    spec: [String]
    file: [String]
    nickname: String
  }

  type Response {
    status: Int!
    message: String!
    body: String
    portfolio: Portfolio
  }

  type Query {
    validateToken(token: String): Boolean
    validateId(userId: String): Boolean
    retrieveUser(userId: String): User
    retrievePortfolio(userId: String): Response!
    retrieveAllPortfolio: [Portfolio]
  }

  type Mutation {
    login(userId: String, passwd: String): Response!
    signup(userId: String @isEmail, passwd: String, nickname: String): Response!
    signout: Response @isAuth
    addPortfolio: Response @isAuth
    addTitle(body: String): Response @isAuth
    addBody(body: String): Response @isAuth
  }
`;
