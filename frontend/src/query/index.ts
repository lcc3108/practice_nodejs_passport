import gql from "graphql-tag";

export const LOG_IN = gql`
  mutation($id: String, $passwd: String!) {
    login(id: $id, passwd: $passwd)
  }
`;
