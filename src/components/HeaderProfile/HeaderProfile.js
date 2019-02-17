import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import cn from 'classnames'

import css from './styles.module.css'
import { removeToken } from '../../utils'
import { Me } from '../Me'

export const HeaderProfile = withApollo(class HPC extends Component {
  state = {
    isLoading: null,
  }

  handleLogout = async () => {
    const { client } = this.props
    this.setState({ isLoading: true })

    try {
      removeToken()
      await client.resetStore()
    } catch (err) {
      //
    }
  }

  render () {
    const { isLoading } = this.state

    return (
      <Me>
        {({ data }) => {
          if (data && data.me) {
            const { me } = data
            return (
              <div className={cn(css.profile)}>
                <div>
                  <strong>{me.name}</strong>
                </div>
                <i
                  className={cn(css.banIndicator, { [css.banned]: me.isBanned })}
                  title={me.isBanned ? 'User is banned' : undefined}
                />
                <button
                  type="button"
                  disabled={isLoading}
                  className="btn btn-primary ml-3"
                  onClick={this.handleLogout}
                >
                  Log out
                </button>
              </div>
            )
          }

          return null
        }}
      </Me>
    )
  }
})
