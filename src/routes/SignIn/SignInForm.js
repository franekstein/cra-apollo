import React from 'react'
import { withApollo } from 'react-apollo'
import { reduxForm, Field, getFormValues } from 'redux-form'
import { compose, withProps } from 'recompose'
import { connect } from 'react-redux'
import isEqual from 'lodash/isEqual'

import { onSubmit } from './onSubmit'
import { FieldInput } from '../../components'

const adminCredentials = {
  email: 'admin@email.com',
  password: '1234567890',
}

const useAdminCredentials = (change) => () => {
  change('email', adminCredentials.email)
  change('password', adminCredentials.password)
}

const userCredentials = {
  email: 'user@email.com',
  password: '1234567890',
}

const useUserCredentials = (change) => () => {
  change('email', userCredentials.email)
  change('password', userCredentials.password)
}

export const SignInForm = compose(
  withApollo,
  withProps(props => ({
    form: props.form || 'sign-in',
    onSubmit,
  })),
  reduxForm({ enableReinitialize: true }),
  connect((state, { form }) => ({
    values: getFormValues(form)(state),
  })),
)(props => {
  const { handleSubmit, submitting, error, change, values, reset } = props
  const isAdminCredentials = isEqual(values, adminCredentials)
  const isUserCredentials = isEqual(values, userCredentials)
  return (
    <form onSubmit={handleSubmit}>
      <Field
        label="Email"
        type="email"
        name="email"
        component={FieldInput}
        id="exampleInputEmail"
        aria-describedby="emailHelp"
        placeholder="Enter email"
      />

      <Field
        label="Password"
        type="password"
        name="password"
        component={FieldInput}
        id="exampleInputPassword"
        aria-describedby="emailHelp"
        placeholder="Password"
      />

      {!submitting && error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div>
        <button
          disabled={submitting}
          className="btn btn-primary"
        >
          Submit
        </button>

        <button
          type="button"
          className="btn btn-link ml-3"
          onClick={reset}
        >
          Reset
        </button>

        <div className="mt-5">
          <h6>Or you can use one of this credentials</h6>
          <button
            type="button"
            disabled={isAdminCredentials}
            className="btn btn-warning"
            onClick={useAdminCredentials(change)}
          >
            Admin
          </button>
          <button
            type="button"
            disabled={isUserCredentials}
            className="btn btn-info ml-3"
            onClick={useUserCredentials(change)}
          >
            User
          </button>
        </div>
      </div>
    </form>
  )
})
