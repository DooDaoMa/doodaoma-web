/* eslint-disable react/display-name */
import React from 'react'
import { UseFormRegister } from 'react-hook-form'

import { ISignUpFormValue } from '../../types'

type InputProps = {
  label: string
  type?: string
  placeholder?: string
}

export const Input = React.forwardRef<
  HTMLInputElement,
  InputProps & ReturnType<UseFormRegister<ISignUpFormValue>>
>(({ label, placeholder, type = 'text', onChange, onBlur }, ref) => {
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
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
      />
    </div>
  )
})
