import React, { Fragment } from 'react'

import { Container, Footer, Header } from '../../components'
import { LikedShow } from './LikedShow'

import './style.css'

const showIds = new Array(8).fill(0).map((_, i) => i + 1)

export const Profile = () => (
  <Fragment>
    <Header />
    <Container component="main">
      <div className="profile-shows">
        <h3>Liked shows</h3>
        <ul>
          {showIds.map(id => (
            <li key={id}>
              <LikedShow id={id} />
            </li>
          ))}
        </ul>
      </div>
    </Container>
    <Footer />
  </Fragment>
)
