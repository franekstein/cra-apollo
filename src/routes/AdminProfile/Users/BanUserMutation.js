import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const BAN_USER = gql`
  mutation BanUser ($id: ID!) {
    banUser (id: $id) {
      id
      isBanned
    }
  }
`

export const BanUserMutation = (props) => <Mutation mutation={BAN_USER} {...props} />
