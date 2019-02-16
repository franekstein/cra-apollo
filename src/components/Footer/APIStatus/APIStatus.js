import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import cn from "classnames";

import "./style.css";

const API_STATUS = gql`
  query APIStatus {
    __schema {
      queryType {
        name
      }
    }
  }
`;

const pollInterval = 60 * 1000; // 1 min

export const APIStatus = () => (
  <Query
    query={API_STATUS}
    pollInterval={pollInterval}
    notifyOnNetworkStatusChange
  >
    {({ loading, error, data }) => {
      const className = cn("api-status", {
        error,
        loading,
        online: data
      });
      return <span className={className} />;
    }}
  </Query>
);
