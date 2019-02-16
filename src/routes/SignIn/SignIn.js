import React, { Fragment } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { Container, Footer } from '../../components'
import { SignInForm } from './SignInForm'
import { saveToken } from '../../utils'

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
    <Fragment>
      <Container component="main">
        <h1 className="mb-3">Sign In</h1>
        <Mutation
          mutation={SIGN_IN}
          refetchQueries={() => ['Me']}
          update={(_, { data }) => saveToken(data.signIn.token)}
        >
          {signIn => <SignInForm signIn={signIn} />}
        </Mutation>
      </Container>
      <Footer />
    </Fragment>
  )
}
