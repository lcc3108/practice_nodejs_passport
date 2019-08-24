import { ApolloServer } from "apollo-server-express";
import { resolvers } from "@/controllers/graphql/resolvers";
import { typeDefs } from "@/models/graphql/types";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ user: req.user }),
});

export default server;
