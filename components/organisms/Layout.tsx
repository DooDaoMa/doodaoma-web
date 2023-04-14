import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { ReactNode, useMemo } from 'react'
import { Theme, ToastContainer } from 'react-toastify'

import { useRestoreUser } from '../../hooks/useRestoreUser'
import { selectImaging } from '../../store/features/imaging'
import { useAppSelector } from '../../store/hooks'
import { Loading } from '../atoms/Loading'
import { FloatingExposuringStatus } from '../molecules/FloatingExposuringStatus'

import { Navigation } from './Navigation'

export const Layout = ({ children }: { children: ReactNode }) => {
  const { pathname, push } = useRouter()
  const { imagingStatus } = useAppSelector(selectImaging)
  const isRestoring = useRestoreUser()
  const { theme } = useTheme()

  const isShowFloatingStatusWindow = useMemo(() => {
    const onImgingPath = pathname === '/imaging'
    return !onImgingPath && imagingStatus === 'busy'
  }, [pathname, imagingStatus])

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
      <ToastContainer theme={theme as Theme} />
      <FloatingExposuringStatus
        isShow={isShowFloatingStatusWindow}
        onClick={() => push('/imaging')}
      />
    </>
  )
}
