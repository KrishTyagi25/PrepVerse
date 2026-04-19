import { useEffect, useRef, useCallback } from 'react'
import { io } from 'socket.io-client'

let socketInstance = null

export function useSocket() {
  const socket = useRef(null)

  const connect = useCallback(() => {
    const token = localStorage.getItem('accessToken')
    if (!token) return null

    if (socketInstance?.connected) {
      socket.current = socketInstance
      return socketInstance
    }

    socketInstance = io(import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000', {
      auth:            { token },
      withCredentials: true,
      transports:      ['websocket', 'polling'],
      reconnection:      true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    })

    socketInstance.on('connect', () => {
      console.log('✅ Socket connected:', socketInstance.id)
    })

    socketInstance.on('disconnect', (reason) => {
      console.log('❌ Socket disconnected:', reason)
    })

    socketInstance.on('connect_error', (err) => {
      console.error('Socket error:', err.message)
    })

    socket.current = socketInstance
    return socketInstance
  }, [])

  const disconnect = useCallback(() => {
    if (socketInstance) {
      socketInstance.disconnect()
      socketInstance = null
    }
  }, [])

  const emit = useCallback((event, data) => {
    if (socket.current?.connected) {
      socket.current.emit(event, data)
    }
  }, [])

  const on = useCallback((event, handler) => {
    if (socket.current) {
      socket.current.off(event, handler) // prevent duplicate listeners
      socket.current.on(event, handler)
    }
  }, [])

  const off = useCallback((event, handler) => {
    socket.current?.off(event, handler)
  }, [])

  return { connect, disconnect, emit, on, off, socket: socket.current }
}