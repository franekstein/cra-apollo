import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'

import { route } from '../constants'
import { Me, SiteLoader } from '../components'
import { Profile } from './Profile'
import { SignIn } from './SignIn'
import { AdminProfile } from './AdminProfile'

export const Routes = () => {
  return (
    <Route path={route.root}>
      <Me>
        {({ data, loading, error }) => {
          const initialized = !(!error && loading && isEmpty(data))

          if (initialized) {
            const isLogged = !!(data && data.me && data.me.id)

            // Logged user
            if (isLogged) {
              const isAdmin = !!(data && data.me && data.me.isAdmin)

              if (isAdmin) {
                return (
                  <Switch>
                    <Redirect from={route.signIn} to={route.root} />
                    <Route component={AdminProfile} />
                  </Switch>
                )
              }

              return (
                <Switch>
                  <Redirect from={route.signIn} to={route.root} />
                  <Route component={Profile} />
                </Switch>
              )
            }

            return (
              <Switch>
                <Route path={route.signIn} component={SignIn} />
                <Redirect to={route.signIn} />
              </Switch>
            )
          }

          return <SiteLoader />
        }}
      </Me>
    </Route>
  )
}
