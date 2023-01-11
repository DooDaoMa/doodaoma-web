import { useEffect } from 'react'
import { useSocketIO } from '../context/SocketIOContext'

interface SocketEvent {
  eventName: string
  listener: (...args: any[]) => void
}

export const useListenToSocketEvents = (...events: SocketEvent[]) => {
  const { socket, isConnected } = useSocketIO()

  useEffect(() => {
    if (isConnected) {
      events.forEach((event) => {
        socket.on(event.eventName, event.listener)
      })
    }

    return () => {
      events.forEach((event) => {
        socket.off(event.eventName)
      })
    }
  }, [socket, isConnected, events])
}
