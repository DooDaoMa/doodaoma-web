import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'

import { useRestoreUser } from '../../hooks/useRestoreUser'
import { Loading } from '../atoms/Loading'

import { Navigation } from './Navigation'

export const Layout = ({ children }: { children: ReactNode }) => {
  const isRestoring = useRestoreUser()

  return (
    <>
      <Navigation />
      {isRestoring ? (
        <h1>
          <Loading />
        </h1>
      ) : (
        <main className="min-h-full sm:p-4 md:p-12">{children}</main>
      )}
      <ToastContainer />
    </>
  )
}
