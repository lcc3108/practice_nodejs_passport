import React from "react";
import Profile from "./Profile";
import { Query } from "react-apollo";
import { GETALLPORTFOLIO } from "./query";

interface IData {
  retrieveAllPortfolio: IResponse[];
}

interface IResponse {
  title: string;
  body: string;
  spec: string[];
  file: string[];
  nickname: string;
}
interface IVariable {}

export default class PortfolioCards extends React.Component {
  public state = { cards: [] };

  public render() {
    return (
      <Query<IData, IVariable> query={GETALLPORTFOLIO}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>;
          if (error) {
            console.log("lcc", error);
            return <div>Error</div>;
          }
          if (data) {
            const items = data.retrieveAllPortfolio;
            console.log("data", items);
            return (
              <div>
                {items.map((item) => {
                  return (
                    <div>
                      <Profile title={item.title} body={item.body} spec={item.spec} nickname={item.nickname} file={item.file} />
                    </div>
                  );
                })}
              </div>
            );
          }

          return <div>no data</div>;
        }}
      </Query>
    );
  }
}
