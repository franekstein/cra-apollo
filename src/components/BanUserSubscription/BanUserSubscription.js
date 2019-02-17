import React from 'react'
import gql from 'graphql-tag'
import { Subscription } from 'react-apollo'

const BAN_USER = gql`
  subscription UserBanned ($id: ID!) {
    userBanned (id: $id) {
      id
      isBanned
    }
  }
`;

export const BanUserSubscription = ({ id }) => (
  <Subscription
    subscription={BAN_USER}
    variables={{ id }}
  >
    {({ data }) => {
      if (data && data.userBanned) {
        return (
          <div className="mb-5">
            You were banned
          </div>
        )
      }

      return null
    }}
  </Subscription>
)
