import { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  type?: 'button' | 'submit' | 'reset'
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = (props: ButtonProps) => {
  const { children, type = 'button', onClick, className } = props

  return (
    <button
      type={type}
      className={`transition-button block w-fit rounded-md border border-gray-300 bg-blue-500 px-4 py-2 font-bold uppercase text-white transition focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${className}`}
      onClick={onClick}>
      {children}
    </button>
  )
}
