import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { restoreUser, userSelector } from '../store/features/user'
import { useAppDispatch, useAppSelector } from '../store/hooks'

export const useFetchCurrentUser = () => {
  const dispatch = useAppDispatch()
  const { restoreUserState } = useAppSelector(userSelector)
  const router = useRouter()

  useEffect(() => {
    dispatch(restoreUser())
  }, [dispatch])

  useEffect(() => {
    if (restoreUserState.status === 'error') {
      toast.error('Restore user failed. Please sign in again')
      router.push('/signin')
    }
  }, [restoreUserState])
}
