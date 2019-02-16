import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { ShowCard } from "../../components";

const SHOW = gql`
  query Show($id: ID!) {
    show(id: $id) {
      id
      name
      summary
      image {
        medium
      }
    }
  }
`;

export const LikedShow = ({ id }) => {
  return (
    <Query query={SHOW} variables={{ id }}>
      {({ loading, error, data }) => {
        if (data && data.show) {
          return <ShowCard show={data.show} />;
        }

        return null;
      }}
    </Query>
  );
};
