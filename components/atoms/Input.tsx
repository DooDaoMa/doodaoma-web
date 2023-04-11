import { forwardRef } from 'react'

type InputProps = {
  label?: string
  type?: string
  placeholder?: string
}

/* eslint-disable react/display-name */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, placeholder, type = 'text', ...rest }, ref) => {
    return (
      <div>
        <label htmlFor={label}>{label}</label>
        <input
          type={type}
          id={label}
          name={label}
          placeholder={placeholder}
          ref={ref}
          {...rest}
        />
      </div>
    )
  },
)
