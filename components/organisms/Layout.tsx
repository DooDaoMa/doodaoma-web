import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'

import { useFetchCurrentUser } from '../../hooks/useFetchCurentUser'
import { useObserveAuthentication } from '../../hooks/useObserveAuthentication'

import { Navigation } from './Navigation'

export const Layout = ({ children }: { children: ReactNode }) => {
  useFetchCurrentUser()
  useObserveAuthentication()

  return (
    <>
      <Navigation />
      <main className="min-h-full sm:p-4 md:p-12">{children}</main>
      <ToastContainer />
    </>
  )
}
