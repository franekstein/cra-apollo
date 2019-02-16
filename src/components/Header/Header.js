import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import isFunction from 'lodash/isFunction'

import './style.css'
import { removeToken } from '../../utils'
import { Me } from '../Me'
import { Container } from '../Container'

export const Header = withApollo(class extends Component {
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

  renderContent = ({ isLoading, handleLogout }) => {
    return (
      <Me>
        {({ data }) => {
          if (data && data.me) {
            const { me } = data
            return (
              <div className="header-profile">
                <div>
                  {me.name}
                </div>
                <button
                  type="button"
                  disabled={isLoading}
                  className="btn btn-primary ml-3"
                  onClick={handleLogout}
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

  render () {
    const { isLoading } = this.state
    const { children, ...rest } = this.props

    const contentRenderer = isFunction(children) ? children : this.renderContent
    const contentProps = {
      ...rest,
      isLoading,
      handleLogout: this.handleLogout,
    }

    return (
      <nav className="navbar navbar-default">
        <Container component="div">
          {contentRenderer(contentProps)}
        </Container>
      </nav>
    )
  }
})
