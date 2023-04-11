import { forwardRef } from 'react'

type CheckboxProps = {
  label?: string
}

/* eslint-disable react/display-name */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, ...rest }, ref) => {
    return (
      <div>
        <label htmlFor={label}>{label}</label>
        <input type="checkbox" id={label} name={label} ref={ref} {...rest} />
      </div>
    )
  },
)
