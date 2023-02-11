import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'

import { currentUserSelector, userSelector } from '../../store/features/user'
import { useAppSelector } from '../../store/hooks'

type Props = {
  children: ReactNode
}

export const RouteGuard = ({ children }: Props) => {
  const router = useRouter()
  const currentUser = useAppSelector(currentUserSelector)
  const { restoreUserState } = useAppSelector(userSelector)

  useEffect(() => {
    if (
      restoreUserState.status !== 'success' &&
      restoreUserState.error === null
    ) {
      return
    }
    if (currentUser === null) {
      router.push('/signin')
    }
  }, [currentUser, restoreUserState])

  return <>{children}</>
}
