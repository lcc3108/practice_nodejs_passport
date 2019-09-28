import React, { Component } from "react";
import "./Layout.scss"
import client from "@/lib/Apollo.ts";
import PrimarySearchAppBar from "./components/AppBar/AppBar";
import { ApolloProvider } from "react-apollo";
import PortfolioCards from "@/components/PortfolioCards";


export default class Layout extends Component {
  public state = { jwt: null };

  public setJWT = (token: string) => {
    console.log(token);
    this.setState({ jwt: token });
  };

  render() {
    const { children } = this.props
    return (
      <ApolloProvider client={client}>
        <main>
          <div className="app-bar">
            <PrimarySearchAppBar jwtHandler={this.setJWT} />
          </div>
          <div className="portpolios">
            <PortfolioCards />
          </div>
          <header>Header</header>
          <section>
            {children}
          </section>
        </main>
      </ApolloProvider>
    )
  }
}