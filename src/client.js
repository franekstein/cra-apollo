import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createPersistedQueryLink } from 'apollo-link-persisted-queries'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'

import { getToken, removeToken } from './utils'
import { config } from './config'

const persistedLink = createPersistedQueryLink();
const batchLink = new BatchHttpLink({ uri: config.API_URL });
const authLink = setContext((req, previousContext) => {
  const token = getToken();
  const headers = previousContext.headers

  if (token) {
    return {
      headers: {
        ...headers,
        token
      }
    }
  }

  return { headers };
});
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    const NotAuthenticatedError = graphQLErrors.find(
      ({ name }) => name === "NotAuthenticatedError"
    );
    const token = getToken();
    if (NotAuthenticatedError && token) {
      removeToken();
      try {
        client.resetStore();
      } catch(e) {
        //
      }
    }
  }

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const client = new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    authLink,
    persistedLink,
    batchLink
  ]),
  cache: new InMemoryCache()
});
