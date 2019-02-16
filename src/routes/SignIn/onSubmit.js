import { SubmissionError } from 'redux-form'
import { ERROR } from '../../constants'

const t10n = {
  email: {
    REQUIRED: 'Please enter email',
    INVALID: 'This is not valid email',
  },
  password: {
    REQUIRED: 'Please enter password',
  },
}

export const onSubmit = (values, _, props) => {
  const { signIn } = props

  return signIn({ variables: { input: values } }).catch(err => {
    const { graphQLErrors, message } = err

    let errors

    if (graphQLErrors) {
      // params validation errors
      const paramsError = graphQLErrors.find(e => e.name === ERROR.PARAMS_ERROR)
      if (paramsError) {
        const { data } = paramsError
        errors = Object.keys(data).reduce((acc, key) => ({ ...acc, [key]: t10n[key][data[key]] || data[key] }), {})

        if (errors) {
          throw new SubmissionError(errors)
        }
      }

      // schema errors
      const internalError = graphQLErrors.find(e => (e.extensions || {}).code === ERROR.INTERNAL_SERVER_ERROR)
      if (internalError) {
        throw new SubmissionError({ _error: '🤷 Oops. You should provide credentials!' })
      }
    }
    // here you will handle all errors

    throw new SubmissionError({ _error: message.replace(/GraphQL error: /, '') })
  })
}
