import React from 'react'
import cn from 'classnames'

export const FieldInput = ({ className, id, label, input, meta, ...rest }) => {
  const { active, error, invalid } = meta
  const showError = invalid && !active
  return (
    <div className={cn('form-group', className)}>
      <label htmlFor={id}>{label}</label>
      <input
        className={cn('form-control', { 'is-invalid': showError })}
        id={id}
        {...input}
        {...rest}
      />
      {showError && (
        <div className="invalid-feedback">
          {error}
        </div>
      )}
    </div>
  )
}
