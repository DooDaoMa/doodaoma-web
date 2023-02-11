import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

import {
  resetCurrentUser,
  restoreUser,
  userSelector,
} from '../store/features/user'
import { useAppDispatch, useAppSelector } from '../store/hooks'

export const useRestoreUser = () => {
  const dispatch = useAppDispatch()
  const { restoreUserState } = useAppSelector(userSelector)
  const router = useRouter()

  useEffect(() => {
    dispatch(restoreUser())
  }, [])

  useEffect(() => {
    if (restoreUserState.status === 'success') {
      router.push(router.pathname)
    }
    if (restoreUserState.status === 'error') {
      toast.error('Restore user failed. Please sign in again')
      dispatch(resetCurrentUser())
    }
  }, [restoreUserState])

  return restoreUserState.status === 'loading'
}
