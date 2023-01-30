import {
  faPlus,
  faCalendar,
  faUser,
  faImage,
  faStethoscope,
  faBars,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useSelector } from 'react-redux'

import { currentUserSelector } from '../../store/features/user'
import { MenuItem } from '../molecules/MenuItem'

export const Navigation = () => {
  const currentUser = useSelector(currentUserSelector)

  return (
    <nav className="border-b border-white px-4 py-4 shadow-md sm:px-12">
      <div className="hidden sm:relative sm:grid sm:grid-cols-3">
        <div />
        <div className="flex items-center justify-center gap-x-12">
          <MenuItem icon={faStethoscope} to="/" />
          <MenuItem icon={faCalendar} to="/" />
          <MenuItem icon={faImage} to="/" />
          <MenuItem icon={faUser} to="/" />
        </div>
        <div className="flex items-center justify-end">
          {currentUser ? (
            <>
              <div className="flex cursor-pointer items-center gap-x-2 rounded rounded-full bg-blue-200 py-1 pl-1 pr-4">
                <div className="h-8 w-8 rounded rounded-full bg-white" />
                {currentUser.username}
              </div>
              <div className="text-blue-600">
                <FontAwesomeIcon icon={faPlus} className="nav-icon" />
              </div>
            </>
          ) : (
            <Link href={'/signin'}>login</Link>
          )}
        </div>
      </div>
      <div className="flex justify-end sm:hidden">
        <FontAwesomeIcon icon={faBars} />
      </div>
    </nav>
  )
}
