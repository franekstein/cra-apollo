const GRAPHQL_HTTP_URI = process.env.REACT_APP_GRAPHQL_HTTP_API || 'https://movies-graphql-server.glitch.me/'
const GRAPHQL_WS_URI = process.env.REACT_APP_GRAPHQL_WS_API || 'wss://movies-graphql-server.glitch.me/'

export const config = {
  URI: GRAPHQL_HTTP_URI,
  WS: GRAPHQL_WS_URI,
}
