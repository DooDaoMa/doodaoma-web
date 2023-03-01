import { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  btnStyle?: 'primary' | 'secondary' | 'danger' | 'warning'
  type?: 'button' | 'submit' | 'reset'
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = (props: ButtonProps) => {
  const {
    children,
    btnStyle = 'primary',
    type = 'button',
    onClick,
    className,
  } = props

  const getStyle = () => {
    switch (btnStyle) {
      case 'primary':
        return 'primary-btn'
      case 'secondary':
        return 'secondary-btn'
      case 'warning':
        return 'warning-btn'
      default:
        return 'primary-btn'
    }
  }
  return (
    <button
      type={type}
      className={`transition-button block w-fit rounded-md border px-4 py-2 font-bold uppercase sm:text-sm ${className} ${getStyle()}`}
      onClick={onClick}>
      {children}
    </button>
  )
}
