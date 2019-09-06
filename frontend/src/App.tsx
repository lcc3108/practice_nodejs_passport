import React, { Component } from "react";
import "./App.css";
import client from "./Apollo";
import { ApolloProvider, useMutation } from "@apollo/react-hooks";
import PrimarySearchAppBar from "./AppBar";

export default class App extends React.Component {
  public state = { jwt: null };
  constructor(props: any) {
    super(props);
  }

  public setJWT = (token: string) => {
    console.log(token);
    this.setState({ jwt: token });
  };

  public render() {
    return (
      <ApolloProvider client={client}>
        <PrimarySearchAppBar jwtHandler={this.setJWT} />
        <div className="App"></div>
      </ApolloProvider>
    );
  }
}
