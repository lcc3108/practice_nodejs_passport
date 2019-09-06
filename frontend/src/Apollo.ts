import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";
import React from "react";
const client = new ApolloClient({
  uri: "http://localhost:5000",
});
export const searchUser = () => {
  client
    .query({
      query: gql`
        {
          retrieveUser(id: "admin@test.com") {
            id
          }
        }
      `,
    })
    .then((result) => console.log(result));
};

export default client;
