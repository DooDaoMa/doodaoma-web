import { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client'

const CONNECT = 'connect'
const DISCONNECT = 'disconnect'

export const useConnectSocketIO = (namespace: string) => {
  const socket = useMemo(() => io(namespace), [namespace])
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    socket.on(CONNECT, () => {
      setIsConnected(true)
    })

    socket.on(DISCONNECT, () => {
      setIsConnected(false)
    })

    return () => {
      socket.off(CONNECT)
      socket.off(DISCONNECT)
    }
  }, [socket])

  return { socket, isConnected }
}
