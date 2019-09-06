import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://asia-east2-nodejs-lcc3108.cloudfunctions.net/lcc3108-function-test",
});

export default client;
