import React from "react";

import { APIStatus } from "./APIStatus";

export const Footer = () => {
  return (
    <footer>
      <div className="container">
        <small className="text-muted">
          If UI is stuck! Check that{" "}
          <a
            href="https://movies-graphql-server.glitch.me/"
            target="_blank"
            rel="noopener noreferrer"
          >
            graphql API
          </a>{" "}
          is working <APIStatus />
        </small>
      </div>
    </footer>
  );
};
