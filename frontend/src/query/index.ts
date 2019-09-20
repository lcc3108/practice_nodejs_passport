import gql from "graphql-tag";

export const LOGIN = gql`
  mutation($id: String, $passwd: String!) {
    login(id: $id, passwd: $passwd)
  }
`;

export const SIGNUP = gql`
  mutation($id: String, $passwd: String!, $nickname: String!) {
    signup(id: $id, passwd: $passwd, nickname: $nickname)
  }
`;

export const ADDPORTFOLIO = gql`
  mutation($name: String) {
    addPortfolio(name: $name)
  }
`;

export const GETALLPORTFOLIO = gql`
  query RetrieveAllPortfolio {
    retrieveAllPortfolio {
      title
      body
      spec
      file
      nickname
    }
  }
`;
