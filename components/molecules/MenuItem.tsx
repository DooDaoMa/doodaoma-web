import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'

type MenuItemProps = {
  icon: IconProp
  to: string
}

export const MenuItem = (props: MenuItemProps) => {
  const { icon, to } = props
  return (
    <Link href={to}>
      <FontAwesomeIcon
        icon={icon}
        className="h-5 w-5 cursor-pointer text-blue-600"
      />
    </Link>
  )
}
