import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { SignInForm } from './SignInForm'
import { saveToken } from '../utils'

const SIGN_IN = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      token
      refreshToken
    }
  }
`

export const SignIn = () => {
  return (
    <div>
      <h1>SignIn</h1>
      <Mutation
        mutation={SIGN_IN}
        refetchQueries={() => ['Me']}
        update={(_, { data }) => {
          try {
            saveToken(data.signIn.token)
          } catch (e) {
            //
          }
        }}
      >
        {signIn => {
          return <SignInForm signIn={signIn} />
        }}
      </Mutation>
    </div>
  )
}
