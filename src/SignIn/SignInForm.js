import React from 'react'
import { withApollo } from 'react-apollo'
import { reduxForm, Field, getFormValues } from 'redux-form'
import { compose, withProps } from 'recompose'
import { connect } from 'react-redux'
import isEqual from 'lodash/isEqual'

import { onSubmit } from './onSubmit'
import { FieldInput } from '../components'

const initialValues = {
  email: 'admin@email.com',
  password: '1234567890',
}

const useAdminCredentials = (change) => () => {
  change('email', initialValues.email)
  change('password', initialValues.password)
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
  const { submit, submitting, error, change, values, reset } = props
  const isAdminValues = isEqual(values, initialValues)
  return (
    <div>
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

      <div className="form-group">
        <small id="passwordHelpBlock" className="form-text text-muted">
          Try to enter email: <b>{initialValues.email}</b> and password: <b>{initialValues.password}</b>
        </small>
      </div>

      {!submitting && error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div>
        <button
          type="button"
          disabled={submitting}
          className="btn btn-primary"
          onClick={submit}
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

        <button
          type="button"
          disabled={isAdminValues}
          className="btn btn-light ml-3"
          onClick={useAdminCredentials(change)}
        >
          Use admin credentials
        </button>
      </div>
    </div>
  )
})
