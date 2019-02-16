import React, { Fragment } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { Container, Footer } from '../../components'
import { SignInForm } from './SignInForm'
import { saveToken } from '../../utils'
import css from './styles.module.css'

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
        <div className={css.signIn}>
          <h1 className="mb-3">Sign In</h1>
          <Mutation
            mutation={SIGN_IN}
            refetchQueries={() => ['Me']}
            update={(_, { data }) => saveToken(data.signIn.token)}
          >
            {signIn => <SignInForm signIn={signIn} />}
          </Mutation>
        </div>
      </Container>
      <Footer />
    </Fragment>
  )
}
