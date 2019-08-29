import { gql } from "apollo-server-express";
import {makeExecutableSchema}  from 'graphql-tools';

export const typeDefs = gql`
  directive @isAuth on FIELD_DEFINITION
  directive @length(max: Int) on  ARGUMENT_DEFINITION | INPUT_FIELD_DEFINITION
  directive @constraint(
    # String constraints
    minLength: Int
    maxLength: Int
    startsWith: String
    endsWith: String
    notContains: String
    pattern: String
    format: String

    # Number constraints
    min: Int
    max: Int
    exclusiveMin: Int
    exclusiveMax: Int
    multipleOf: Int
  ) on INPUT_FIELD_DEFINITION | FIELD_DEFINITION | ARGUMENT_DEFINITION | FIELD
  # directive @isAuthUser on FIELD_DEFINITION

  type User {
    id: String! @constraint(format:"email")
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
    login(id: String, passwd: String): String
    signup(id: String, passwd: String,nickName: String  ): Response 
    signout: Response @isAuth
    addPortfolio: Response @isAuth
    addTitle: Response @isAuth
    addBody: Response @isAuth
  }
`;
