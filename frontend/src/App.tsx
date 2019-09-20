import React, { Component } from "react";
import "./App.css";
import client from "./Apollo";
import { ApolloProvider } from "react-apollo";
import PrimarySearchAppBar from "./AppBar";
import PortfolioCards from "./PortfolioCards";
export default class App extends Component {
  public state = { jwt: null };

  public setJWT = (token: string) => {
    console.log(token);
    this.setState({ jwt: token });
  };

  public render() {
    return (
      <ApolloProvider client={client}>
        <div className="app-bar">
          <PrimarySearchAppBar jwtHandler={this.setJWT} />
        </div>
        <div className="portpolios">
          <PortfolioCards />
        </div>
      </ApolloProvider>
    );
  }
}
