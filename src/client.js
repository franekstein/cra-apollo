import { ApolloClient } from 'apollo-client'
import { ApolloLink, split } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createPersistedQueryLink } from 'apollo-link-persisted-queries'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities';

import { getToken, removeToken } from './utils'
import { config } from './config'

const { URI, WS } = config
const authLink = setContext((req, previousContext) => {
  const token = getToken()
  const headers = previousContext.headers

  if (token) {
    return {
      headers: {
        ...headers,
        token,
      },
    }
  }

  return { headers }
})
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    const NotAuthenticatedError = graphQLErrors.find(
      ({ name }) => name === 'NotAuthenticatedError',
    )
    const token = getToken()
    if (NotAuthenticatedError && token) {
      removeToken()
      try {
        client.resetStore()
      } catch (e) {
        //
      }
    }
  }

  if (networkError) console.log(`[Network error]: ${networkError}`)
})
const persistedLink = createPersistedQueryLink()
const batchLink = new BatchHttpLink({ uri: URI })
const wsLink = new WebSocketLink({
  uri: WS,
  options: {
    reconnect: true,
  },
})
const dataLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  batchLink,
)


export const client = new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    authLink,
    persistedLink,
    // batchLink,
    dataLink,
  ]),
  cache: new InMemoryCache(),
})
