import React from "react";
import { ApolloConsumer } from "react-apollo";
import ApolloClient from "apollo-client";

export interface ICacheType { }

export const withApolloClient = <P extends { client: ApolloClient<ICacheType> }, T extends Omit<P, "client">>(ContentComponent: React.ComponentType<P>) => {
  return (props: T) => {
    const WithClientComponent: React.ComponentType<T> = ContentComponent as any;
    return <ApolloConsumer>{(client: ApolloClient<any>) => <WithClientComponent {...props} client={client} />}</ApolloConsumer>;
  };
};
