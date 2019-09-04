import { ApolloServer } from "apollo-server-express";
import { resolvers } from "@/controllers/graphql/resolvers";
import { typeDefs } from "@/models/graphql/types";
import { schemaDirectives } from "@/models/graphql/directives";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ user: req["user"] }),
  schemaDirectives,
});

export default server;
