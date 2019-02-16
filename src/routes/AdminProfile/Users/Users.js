import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import isEmpty from 'lodash/isEmpty'
import { BanUserMutation } from './BanUserMutation'
import { Me } from '../../../components/Me'

const USERS = gql`
  query Users ($excludeIds: [ID!]) {
    users (excludeIds: $excludeIds) {
      id
      isAdmin
      isBanned
      name
    }
  }
`

export const Users = () => {
  return (
    <Me>
      {({ data }) => (
        <>
          <h2 className="mb-3">Users</h2>
          <Query query={USERS} variables={{ excludeIds: [data.me.id] }}>
            {({ loading, data, error }) => {
              if (error) {
                return (
                  <div>
                    Error: {JSON.stringify(error, null, 4)}
                  </div>
                )
              }
              if (loading && isEmpty(data)) return 'Loading...'
              if (!isEmpty(data)) {
                const { users } = data
                return (
                  <div>
                    <table className="table table-bordered">
                      <thead className="thead-dark">
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Admin</th>
                        <th scope="col">Banned</th>
                        <th scope="col">Controls</th>
                      </tr>
                      </thead>
                      <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <th scope="row">{user.id}</th>
                          <td>{user.name}</td>
                          <td>{user.isAdmin && String(user.isAdmin)}</td>
                          <td>{!user.isAdmin && String(user.isBanned)}</td>
                          <td>
                            {!user.isAdmin && !user.isBanned && (
                              <BanUserMutation variables={{ id: user.id }}>
                                {(banUser, { loading, error }) => (
                                  <button
                                    type="button"
                                    disabled={loading || error}
                                    className="btn btn-danger btn-sm"
                                    onClick={banUser}
                                  >
                                    Ban
                                  </button>
                                )}
                              </BanUserMutation>
                            )}
                          </td>
                        </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
                )
              }
              return null
            }}
          </Query>
        </>
      )}
    </Me>
  )
}
