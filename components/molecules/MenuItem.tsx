import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'

type MenuItemProps = {
  icon: IconProp
  isSelected: boolean
  to: string
}

export const MenuItem = (props: MenuItemProps) => {
  const { icon, isSelected, to } = props
  return (
    <Link
      href={to}
      className={`border-b-2 border-transparent pb-2 ${
        isSelected ? 'rounded-sm  border-b-blue-600' : ''
      }`}>
      <FontAwesomeIcon
        icon={icon}
        className={`h-5 w-5 cursor-pointer text-blue-600`}
      />
    </Link>
  )
}
