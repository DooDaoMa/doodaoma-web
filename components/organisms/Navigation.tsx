import {
  faPlus,
  faCalendar,
  faUser,
  faImage,
  faStethoscope,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { MenuItem } from '../molecules/MenuItem'

export const Navigation = () => {
  const isLoggedIn = true

  return (
    <nav className="relative flex items-center justify-center border-b border-white px-12 py-4 shadow-md">
      <div className="flex items-center gap-x-12">
        <MenuItem icon={faStethoscope} to="/" />
        <MenuItem icon={faCalendar} to="/" />
        <MenuItem icon={faImage} to="/" />
        <MenuItem icon={faUser} to="/" />
      </div>
      <div className="absolute right-24 flex items-center gap-x-12">
        <div className="flex cursor-pointer items-center gap-x-2 rounded rounded-full bg-blue-200 py-1 pl-1 pr-4">
          <div className="h-8 w-8 rounded rounded-full bg-white" />
          username
        </div>
        {isLoggedIn ? (
          <div className="text-blue-600">
            <FontAwesomeIcon icon={faPlus} className="nav-icon" />
          </div>
        ) : null}
      </div>
    </nav>
  )
}
