import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const ME = gql`
  query Me {
    me {
      id
      name
      isAdmin
      isBanned
    }
  }
`;

export const Me = props => <Query query={ME} {...props} />;
