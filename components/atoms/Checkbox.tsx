import { forwardRef } from 'react'

type CheckboxProps = {
  label?: string
}

/* eslint-disable react/display-name */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, ...rest }, ref) => {
    return (
      <div>
        <label
          htmlFor={label}
          className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input type="checkbox" id={label} name={label} ref={ref} {...rest} />
      </div>
    )
  },
)
