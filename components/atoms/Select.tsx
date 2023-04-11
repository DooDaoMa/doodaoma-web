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
        <label htmlFor={label}>{label}</label>
        <select id={label} name={label} ref={ref} {...rest} className="">
          {children}
        </select>
      </div>
    )
  },
)
