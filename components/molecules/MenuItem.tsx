import Link from 'next/link'
import React, { ReactNode } from 'react'

type MenuItemProps = {
  icon: ReactNode
  isSelected: boolean
  to: string
}

export const MenuItem = (props: MenuItemProps) => {
  const { icon, isSelected, to } = props
  return (
    <Link
      href={to}
      className={`box-content flex h-full items-center border-b-2 border-transparent text-blue-600 ${
        isSelected ? ' border-b-blue-600' : ''
      } rounded-sm hover:border-b-blue-300 `}>
      {icon}
    </Link>
  )
}
