import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-boost";
import gql from "graphql-tag";
const cache = new InMemoryCache();
cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem("token"),
    cacheTest: [1, 2, 3],
  },
});

const client = new ApolloClient({
  uri: "https://asia-east2-nodejs-lcc3108.cloudfunctions.net/lcc3108-function-test",
  // uri: "http://localhost:5000", //test uri
  cache,
});

export default client;
