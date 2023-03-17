import {
  faCalendar,
  faUser,
  faImage,
  faBars,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useSelector } from 'react-redux'

import { currentUserSelector } from '../../store/features/user'
import { MenuItem } from '../molecules/MenuItem'

export const Navigation = () => {
  const currentUser = useSelector(currentUserSelector)

  return (
    <nav className="sm: min-h-[73px] border-b border-white px-4 py-4 shadow-md sm:flex sm:items-center sm:px-12">
      <div className="hidden sm:relative sm:grid sm:w-full sm:grid-cols-3 sm:items-center">
        <div />
        <div className="flex items-center justify-center gap-x-12">
          <Link href="/" className="cursor-pointer text-blue-600">
            <svg
              className="h-6 w-5 cursor-pointer text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512">
              <path
                fill="currentcolor"
                d="M638.8 216.8l-85.7-206.1C550.8 4.429 544.2 0 538.3 0c-1.75 0-4.511 .5475-6.136 1.219l-117.3 48.61c-5.438 2.266-9.874 8.877-9.874 14.77c0 1.766 .5059 4.502 1.193 6.127l85.73 206.9c2.25 5.453 8.893 9.895 14.8 9.895c1.75 0 4.473-.5345 6.098-1.206l117.3-48.61C635.6 235.5 640 228.9 640 222.1C640 221.2 639.4 218.5 638.8 216.8zM380.4 92.14L74.25 241.7C65.9 245.8 61.99 254.1 65.21 262.8l8.753 21.13L9.878 310.4C4.44 312.7 0 319.3 0 325.2c0 1.75 .5625 4.499 1.219 6.124l20.06 48.42c2.25 5.453 8.876 9.876 14.78 9.876c1.75 0 4.497-.5469 6.122-1.219L106.2 361.9l8.737 21.09c3.219 7.781 12.52 11.49 21.27 8.479l127-43.69c.168 .2168 .3561 .4824 .5261 .6973L217.4 479.1c-4.406 12.5 2.126 26.22 14.63 30.63C234.6 511.6 237.3 512 239.1 512c9.875 0 19.16-6.157 22.63-16l42.9-121.6c4.686 .959 9.507 1.551 14.48 1.551s9.822-.5039 14.51-1.463l42.87 121.5C380.8 505.8 390.1 512 399.1 512c2.656 0 5.344-.4375 8.001-1.375c12.5-4.406 19.03-18.13 14.63-30.63l-46.42-131.5c9.734-12.28 15.79-27.6 15.79-44.49c0-.1309-.0436-.2406-.0436-.3714l66.58-22.87L380.4 92.14zM319.1 327.1c-13.23 0-24-10.77-24-24c0-13.23 10.77-24 24-24c13.23 0 24 10.77 24 24C343.1 317.2 333.2 327.1 319.1 327.1z"
              />
            </svg>
          </Link>
          <MenuItem icon={faCalendar} to="/reservation" />
          <MenuItem icon={faImage} to="/gallery" />
          <MenuItem icon={faUser} to="/" />
        </div>
        <div className="flex items-center justify-end">
          {currentUser ? (
            <>
              <div className="flex cursor-pointer items-center gap-x-2 rounded-full bg-blue-200 py-1 pl-1 pr-4">
                <div className="h-8 w-8 rounded-full bg-white" />
                {currentUser.username}
              </div>
            </>
          ) : (
            <Link href={'/signin'}>
              <div className="flex cursor-pointer items-center gap-x-1 text-slate-800 transition-opacity hover:text-black">
                <FontAwesomeIcon icon={faRightFromBracket} />
                login
              </div>
            </Link>
          )}
        </div>
      </div>
      <div className="flex justify-end sm:hidden">
        <FontAwesomeIcon icon={faBars} />
      </div>
    </nav>
  )
}
