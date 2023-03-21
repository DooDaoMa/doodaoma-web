import { forwardRef, ReactNode } from 'react'

type SelectProps = {
  label?: string
  children?: ReactNode
}

/* eslint-disable react/display-name */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, children, ...rest }, ref) => {
    return (
      <div>
        <label
          htmlFor={label}
          className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
        <select
          id={label}
          name={label}
          ref={ref}
          {...rest}
          className="block w-full rounded rounded-md border border-gray-300 px-3 py-1 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
          {children}
        </select>
      </div>
    )
  },
)
