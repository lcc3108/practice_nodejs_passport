import { ApolloServer } from "apollo-server-express";
import { resolvers } from "@/controllers/graphql/resolvers";
import { typeDefs } from "@/models/graphql/types";

// import { IsAuthUserDirective } from "@/models/graphql/directive";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ user: req.user }),
  schemaDirectives: {
    // isAuth: IsAuthUserDirective
  }
});

export default server;
