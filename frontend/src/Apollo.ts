import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-boost";

const uri = process.env.NODE_ENV === "production" ? "https://asia-east2-nodejs-lcc3108.cloudfunctions.net/lcc3108-function-test" : "http://localhost:5000";
const cache = new InMemoryCache();
const client = new ApolloClient({
  uri,
  cache,
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem("token"),
  },
});

export default client;
