import React, { Fragment } from 'react'

import { Header, Container, Footer } from '../../components'
import { Users } from './Users'

export const AdminProfile = () => {
  return (
    <Fragment>
      <Header />
      <Container component="main">
        <Users />
      </Container>
      <Footer />
    </Fragment>
  )
}
