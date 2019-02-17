import React from 'react'
import cn from 'classnames'

import css from './styles.module.css'
import { Container } from '../Container'

export const Header = ({ children }) => (
  <nav className={cn('navbar', css.navbarDefault)}>
    <Container component="div">
      {children}
    </Container>
  </nav>
)
