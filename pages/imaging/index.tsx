import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { ReadyState } from 'react-use-websocket'
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket'

import { userSelector } from '../../store/features/user'
import { useAppSelector } from '../../store/hooks'

export default function Imaging() {
  const { currentUser } = useAppSelector(userSelector)

  const { lastJsonMessage, readyState } = useWebSocket(
    `${process.env.NEXT_PUBLIC_WEB_SOCKET_URL}/web`,
    {
      queryParams: {
        userId: currentUser?.id || '',
        deviceId: 'Test Device Id',
      },
      onError: (event) => {
        console.error(event)
        toast.error('Connect to WebSocket failed')
      },
      onOpen: () => {
        toast.success('Connected successfully')
      },
    },
  )

  useEffect(() => {
    if (readyState !== ReadyState.OPEN) {
      return
    }
    if (lastJsonMessage === null) {
      return
    }
    // const message = lastJsonMessage as Message
    console.log(lastJsonMessage)
  }, [lastJsonMessage, readyState])

  return <div></div>
}
