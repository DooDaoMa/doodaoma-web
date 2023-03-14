import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { ReadyState } from 'react-use-websocket'
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket'

import { RouteGuard } from '../../components/organisms/RouteGuard'
import { userSelector } from '../../store/features/user'
import { useAppSelector } from '../../store/hooks'
import { Message } from '../../types/message'

export default function Imaging() {
  const { currentUser } = useAppSelector(userSelector)

  return (
    <RouteGuard>
      {currentUser !== null ? (
        <ImagingWebSocket userId={currentUser.id} />
      ) : (
        'Connecting'
      )}
    </RouteGuard>
  )
}

function ImagingWebSocket({ userId }: { userId: string }) {
  const { lastJsonMessage, readyState } = useWebSocket(
    `${process.env.NEXT_PUBLIC_WEB_SOCKET_URL || 'ws://localhost:8000'}/web`,
    {
      queryParams: {
        userId: userId,
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
    const message = lastJsonMessage as unknown as Message

    switch (message.type) {
      case 'sendMessage': {
        toast.info(message.payload.message)
        break
      }
    }
  }, [lastJsonMessage, readyState])

  return <h1 className="mb-6 text-3xl font-bold">Imaging</h1>
}
