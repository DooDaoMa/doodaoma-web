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
    disabled,
  } = props

  const getStyle = () => {
    switch (btnStyle) {
      case 'primary':
        return 'primary-btn'
      case 'secondary':
        return 'secondary-btn'
      case 'warning':
        return 'warning-btn'
      case 'danger':
        return 'danger-btn'
      default:
        return 'primary-btn'
    }
  }
  return (
    <button
      type={type}
      className={`transition-button block w-fit rounded-md px-4 py-2 font-bold uppercase sm:text-sm ${getStyle()} disabled:cursor-not-allowed disabled:bg-slate-300 ${className}`}
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  )
}
