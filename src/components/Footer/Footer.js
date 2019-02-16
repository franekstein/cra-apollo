import React from 'react'
import cn from 'classnames'

import css from './styles.module.css'
import { Container } from '../Container'

export const Footer = () => {
  return (
    <footer className={css.footer}>
      <Container className={css.container}>
        <small className="text-muted">
          If UI is stuck! Check that{' '}
          <a
            href={process.env.REACT_APP_GRAPHQL_API}
            target="_blank"
            rel="noopener noreferrer"
          >
            API
          </a>{' '}
          works
        </small>
        <small className={cn('text-muted', css.nodeEnv)}><strong>{process.env.NODE_ENV}</strong></small>
      </Container>
    </footer>
  )
}
