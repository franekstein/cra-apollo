import React, { Fragment } from 'react'

import { Header, Container, Footer, HeaderProfile } from '../../components'
import { Users } from './Users'

export const AdminProfile = () => {
  return (
    <Fragment>
      <Header>
        <HeaderProfile />
      </Header>
      <Container component="main">
        <Users />
      </Container>
      <Footer />
    </Fragment>
  )
}
