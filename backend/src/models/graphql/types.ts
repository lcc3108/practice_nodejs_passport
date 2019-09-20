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
    retrieveUser(id: String): User
    retrievePortfolio(id: String): Response!
    retrieveAllPortfolio: [Portfolio]
  }

  type Mutation {
    login(id: String, passwd: String): String
    signup(id: String @isEmail, passwd: String, nickname: String): Response
    signout: Response @isAuth
    addPortfolio: Response @isAuth
    addTitle(body: String): Response @isAuth
    addBody(body: String): Response @isAuth
  }
`;
