import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BsCalendarEvent } from 'react-icons/bs'
import { FaHome, FaBars } from 'react-icons/fa'
import { FiLogIn } from 'react-icons/fi'
import { IoMdImages } from 'react-icons/io'
import { IoTelescope } from 'react-icons/io5'
import { useSelector } from 'react-redux'

import { currentUserSelector } from '../../store/features/user'
import { Button } from '../atoms/Button'
import { ChangeThemeButton } from '../molecules/ChangeThemeButton'
import { MenuItem } from '../molecules/MenuItem'

export const Navigation = () => {
  const router = useRouter()
  const currentUser = useSelector(currentUserSelector)
  const [selected, setSelected] = useState<string>(router.pathname || '')

  useEffect(() => {
    setSelected(router.pathname)
  }, [router.pathname])
  return (
    <nav>
      <div className="hidden h-full sm:relative sm:grid sm:w-full sm:grid-cols-3 sm:items-center">
        <div />
        <div className="flex h-full items-center justify-center gap-x-12">
          <MenuItem
            icon={<FaHome className="h-5 w-5" />}
            to="/"
            isSelected={selected === '/'}
          />
          <MenuItem
            icon={<IoTelescope className="h-5 w-5" />}
            to="/imaging"
            isSelected={selected === '/imaging'}
          />
          <MenuItem
            icon={<BsCalendarEvent className="h-5 w-5" />}
            to="/reservation"
            isSelected={selected === '/reservation'}
          />
          <MenuItem
            icon={<IoMdImages className="h-5 w-5" />}
            to="/gallery"
            isSelected={selected === '/gallery'}
          />
        </div>
        <div className="flex items-center justify-end gap-x-6">
          <ChangeThemeButton />
          {currentUser ? (
            <>
              <div className="flex cursor-pointer items-center gap-x-2 rounded-full bg-blue-200 py-1 pl-1 pr-4">
                <div className="h-8 w-8 rounded-full bg-white" />
                {currentUser.username}
              </div>
            </>
          ) : (
            <>
              <Link href={'/signin'}>
                <div
                  className="flex cursor-pointer items-center
                gap-x-1 text-slate-900 transition-opacity hover:underline dark:text-white">
                  <FiLogIn />
                  <p>login</p>
                </div>
              </Link>
              <Button onClick={() => router.push('/signup')}>sign up</Button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-end sm:hidden">
        <FaBars />
      </div>
    </nav>
  )
}
