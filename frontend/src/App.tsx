import React, { Component } from "react";
import "./App.css";
import client from "./Apollo";
import { ApolloProvider } from "@apollo/react-hooks";
import PrimarySearchAppBar from "./AppBar";

export default class App extends Component {
  public state = { jwt: null };

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
