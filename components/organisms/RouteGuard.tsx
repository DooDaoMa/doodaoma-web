import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'

import { userSelector } from '../../store/features/user'
import { useAppSelector } from '../../store/hooks'

type Props = {
  children: ReactNode
}

export const RouteGuard = ({ children }: Props) => {
  const router = useRouter()
  const { currentUser } = useAppSelector(userSelector)

  useEffect(() => {
    if (currentUser === null) {
      router.push('/signin')
    }
  }, [currentUser])

  return <>{children}</>
}
