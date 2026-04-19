import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { io }      from 'socket.io-client'
import { useAuth } from './AuthContext'

const SocketContext = createContext(null)

export function SocketProvider({ children }) {
  const { user, isLoggedIn } = useAuth()
  const socketRef  = useRef(null)
  const [connected, setConnected]   = useState(false)
  const [onlineUsers, setOnlineUsers] = useState(new Set())

  useEffect(() => {
    if (!isLoggedIn) {
      // Disconnect if logged out
      if (socketRef.current) {
        socketRef.current.disconnect()
        socketRef.current = null
        setConnected(false)
      }
      return
    }

    const token = localStorage.getItem('accessToken')
    if (!token) return

    // Connect
    const socket = io(import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000', {
      auth:            { token },
      withCredentials: true,
      transports:      ['websocket', 'polling'],
      reconnection:      true,
      reconnectionDelay: 1000,
    })

    socketRef.current = socket

    socket.on('connect',    () => setConnected(true))
    socket.on('disconnect', () => setConnected(false))

    socket.on('user:online',  ({ userId }) => {
      setOnlineUsers(prev => new Set([...prev, userId]))
    })
    socket.on('user:offline', ({ userId }) => {
      setOnlineUsers(prev => { const next = new Set(prev); next.delete(userId); return next })
    })

    return () => {
      socket.disconnect()
      socketRef.current = null
      setConnected(false)
    }
  }, [isLoggedIn, user?._id])

  const emit = (event, data) => socketRef.current?.emit(event, data)

  const on  = (event, handler) => {
    socketRef.current?.off(event, handler)
    socketRef.current?.on(event, handler)
  }

  const off = (event, handler) => socketRef.current?.off(event, handler)

  const isOnline = (userId) => onlineUsers.has(userId?.toString())

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, connected, emit, on, off, isOnline }}>
      {children}
    </SocketContext.Provider>
  )
}

export function useSocketContext() {
  return useContext(SocketContext)
}