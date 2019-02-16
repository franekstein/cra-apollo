import { createBrowserHistory, createMemoryHistory } from 'history'

export const history = process.env.IS_NODE
  ? createMemoryHistory()
  : createBrowserHistory()
