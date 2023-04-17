import { forwardRef, InputHTMLAttributes } from 'react'

type InputProps = {
  label?: string
  errorMessage?: string
} & InputHTMLAttributes<HTMLInputElement>

/* eslint-disable react/display-name */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, errorMessage, ...rest }, ref) => {
    return (
      <div>
        <label htmlFor={label}>{label}</label>
        <input
          type="text"
          id={label}
          name={label}
          className={`${errorMessage ? 'error-input' : ''}`}
          ref={ref}
          {...rest}
        />
        {errorMessage ? (
          <p className="mt-2 text-red-500 dark:text-red-500">{errorMessage}</p>
        ) : null}
      </div>
    )
  },
)
