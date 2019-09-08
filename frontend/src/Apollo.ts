import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-boost";

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: "https://asia-east2-nodejs-lcc3108.cloudfunctions.net/lcc3108-function-test",
  cache,
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem("token"),
  },
});

// {
//   onCompleted({ login }) {
//     localStorage.setItem("token", login);
//     client.writeData({ data: { isLoggedIn: true } });
//   },
// },
// client.mutate(
//   { mutation: LOGIN, variables: { id, passwd } },
//   {
//     onCompleted({ login }) {
//       localStorage.setItem("token", login);
//       client.writeData({ data: { isLoggedIn: true } });
//     },
//   },
// );
export default client;
