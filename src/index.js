import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { Provider } from "react-redux";
import isEmpty from 'lodash/isEmpty'

import "./styles.css";
import { client } from "./client";
import { store } from "./store";
import { Me } from "./Me";
import { SignIn } from "./SignIn";
import { Profile } from "./Profile";
import { Footer } from "./Footer";

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <div className="app">
            <main className="container">
              <Me>
                {({ data, loading, error }) => {
                  const isLogged = !!(data && data.me && data.me.id);

                  if (!error && loading && isEmpty(data)) return 'Please wait...'
                  return isLogged ? <Profile /> : <SignIn />;
                }}
              </Me>
            </main>
            <Footer />
          </div>
        </Provider>
      </ApolloProvider>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
