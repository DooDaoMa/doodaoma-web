import { forwardRef } from 'react'

type InputProps = {
  label: string
  type?: string
  placeholder?: string
}

/* eslint-disable react/display-name */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, placeholder, type = 'text', ...rest }, ref) => {
    return (
      <div>
        <label
          htmlFor={label}
          className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          type={type}
          id={label}
          name={label}
          className="block w-full rounded rounded-md border border-gray-300 px-3 py-1 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder={placeholder}
          ref={ref}
          {...rest}
        />
      </div>
    )
  },
)
