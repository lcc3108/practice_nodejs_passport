import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from "apollo-boost";
import { ApolloLink, concat } from 'apollo-link';
import { RetryLink } from 'apollo-link-retry';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-fetch';

const uri = process.env.NODE_ENV === "production" ? "https://asia-east2-nodejs-lcc3108.cloudfunctions.net/lcc3108-function-test" : "http://localhost:5000";
const cache = new InMemoryCache();

const httpLink = createHttpLink({ uri, fetch });
const retryLink = new RetryLink({
  delay: { initial: 300, max: Infinity, jitter: true },
  attempts: { max: 3, retryIf: (error, _operation) => !!error },
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({ headers: { 'x-access-token': 'getLoginToken()' } });

  if (forward) return forward(operation);
  return null;
});

const client = new ApolloClient({
  link: concat(authMiddleware, concat(retryLink, httpLink)),
  cache,
});

cache.writeData({
  data: {
    isLoggedIn: process.browser && !!localStorage.getItem("token"),
  },
});

export default client;
