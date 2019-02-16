import React from "react";

import './styles.css'
import { Container } from '../Container'

export const Footer = () => {
  return (
    <footer>
      <Container className="footer">
        <small className="text-muted">
          If UI is stuck! Check that{" "}
          <a
            href="https://movies-graphql-server.glitch.me/"
            target="_blank"
            rel="noopener noreferrer"
          >
            graphql API
          </a>{" "}
          is working
        </small>
        <small className="text-muted node-env"><strong>{process.env.NODE_ENV}</strong></small>
      </Container>
    </footer>
  );
};
