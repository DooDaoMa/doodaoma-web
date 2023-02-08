import { useEffect } from 'react'

import { AppStore } from '../store'
import { restoreUser } from '../store/features/user'

export const useInitialSetup = (store: AppStore) => {
  useEffect(() => {
    store.dispatch(restoreUser())
  }, [store])
}
