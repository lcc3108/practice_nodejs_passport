import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-boost";
import gql from "graphql-tag";
const cache = new InMemoryCache();
cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem("token"),
    cacheTest: [1, 2, 3],
    // retrieveUser: { __typename: "User", nickname: "test@test.com" },
  },
});

const client = new ApolloClient({
  // uri: "https://asia-east2-nodejs-lcc3108.cloudfunctions.net/lcc3108-function-test",
  uri: "http://localhost:5000", //test uri
  cache,
  resolvers: {
    Query: {
      getUser: (_, { id }, { cache }) => {
        return { __typename: "TestType", test: { a: "a" } };
      },
    },
    // Mutation: {
    //   addCacheTest: (_, { num }, { cache }) => {
    //     const query = gql`
    //       query GetCache {
    //         cacheTest @client
    //       }
    //     `;

    //     const previous = cache.readQuery({ query });
    //     const data = { cacheTest: [...previous.cacheTest, num] };

    //     // you can also do cache.writeData({ data }) here if you prefer
    //     cache.writeQuery({ query, data });
    //     return num;
    //   },
    // },
  },
});

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkb…m8ifQ.sC4RIIAFKz9AQ8K9VFxBQTk2lW7zR3DVh3Tf4iAc0as
// client.mutate({
//   mutation: gql``
// })

(async () => {
  const test1 = await client.query({
    query: gql`
      query getUser($userId: String) {
        retrieveUser(id: $userId) {
          id
        }
      }
    `,
    variables: { userId: "admin@test.com" },
  });

  await new Promise((resolve) => setTimeout(() => resolve(true), 1000));

  const test2 = await client.query({
    query: gql`
      query getUser($userId: String) {
        retrieveUser(id: $userId) {
          id
        }
      }
    `,
    variables: { userId: "admin@test.com" },
  });

  const test3 = await client.query({
    query: gql`
      query getUser($userId: String) {
        retrieveUser(id: $userId) {
          id
        }
      }
    `,
    variables: { userId: "admin@test.com" },
  });

  console.log(client.cache);

  console.log(test1);
  console.log(test2);
  console.log(test3);
})();

// client
//   .query({
//     query: gql`
//       query getUser($userId: String) {
//         retrieveUser(id: $userId) {
//           id
//         }
//       }
//     `,
//     variables: { userId: "admin@test.com" },
//   })
//   .then((result) => {
//     console.log(result);

//     // client
//     //   .mutate({
//     //     mutation: gql`
//     //       mutation addCache($number: Number) {
//     //         addCacheTest(num: $number) @client
//     //       }
//     //     `,
//     //     variables: { number: Math.random() },
//     //   })
//     //   .then(() => {
//     //     client
//     //       .query({
//     //         query: gql`
//     //           query {
//     //             cacheTest
//     //           }
//     //         `,
//     //         variables: {},
//     //       })
//     //       .then((after) => console.log(after));
//     //   });
//   });

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
