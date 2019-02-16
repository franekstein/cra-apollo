import React from 'react'
import cn from 'classnames'

import css from './styles.module.css'
import { config } from '../../config'
import { Container } from '../Container'

export const Footer = () => {
  return (
    <footer className={css.footer}>
      <Container className={css.container}>
        <small className="text-muted">
          If UI is stuck! Check that{' '}
          <a
            href={config.URI}
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
