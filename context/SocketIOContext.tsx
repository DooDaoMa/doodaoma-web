import { createContext, ReactNode, useContext } from 'react'
import { Socket } from 'socket.io-client/build/esm/socket'
import { useConnectSocketIO } from '../hooks/useConnectSocketIO'

type ContextProps = {
  socket: Socket
  isConnected: boolean
}

export const SocketIOContext = createContext<ContextProps>({} as ContextProps)

type Props = {
  children: ReactNode
  namespace?: string
}

export const SocketIOProvider = ({ children, namespace }: Props) => {
  const { socket, isConnected } = useConnectSocketIO(namespace || '/')

  return (
    <SocketIOContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketIOContext.Provider>
  )
}

export const useSocketIO = () => useContext(SocketIOContext)
