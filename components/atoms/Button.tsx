import { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  type: 'button' | 'submit' | 'reset'
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = (props: ButtonProps) => {
  const { children, type = 'button' } = props
  return (
    <button
      type={type}
      className="block w-full rounded rounded-md border border-gray-300 bg-blue-500 px-3 py-1 text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
      {children}
    </button>
  )
}
