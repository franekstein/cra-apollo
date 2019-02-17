import React from 'react'

import { BanUserSubscription, Container, Footer, Header, HeaderProfile, Me } from '../../components'
import { LikedShow } from './LikedShow'

import css from './styles.module.css'

const showIds = new Array(8).fill(0).map((_, i) => i + 1)

export const Profile = () => (
  <Me>
    {({ data }) => (
      <>
        <Header>
          <HeaderProfile />
        </Header>
        <Container component="main">
          <BanUserSubscription id={data.me.id} />

          <div className={css.profileShows}>
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
      </>
    )}
  </Me>
)
