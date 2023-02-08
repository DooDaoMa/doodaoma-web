import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { userSelector } from '../store/features/user'
import { useAppSelector } from '../store/hooks'

const PUBLIC_PATHS = ['/signin', '/signup']

export const useObserveAuthentication = () => {
  const router = useRouter()
  const { currentUser } = useAppSelector(userSelector)

  useEffect(() => {
    if (PUBLIC_PATHS.includes(router.pathname) && currentUser === null) {
      return
    }
    if (currentUser) {
      router.push('/')
    } else {
      router.push('/signin')
    }
  }, [router.pathname, currentUser])
}
