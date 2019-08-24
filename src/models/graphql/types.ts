import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    passwd: String
  }

  type Query {
    user(id: String): User
  }

  type Mutation {
    login(id: String, passwd: String): String!
    signout: Boolean
  }
`;
