import React, { useState, useRef, useEffect } from 'react'
import { MessageBubble } from './MessageBubble'
import { Button } from '../../components/ui/Button'
import { messageService } from '../../api/messageService'
import { useSocketContext } from '../../context/SocketContext'

export function ChatWindow({ convo }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [typing, setTyping] = useState(false)
  const [peerTyping, setPeerTyping] = useState(false)

  const bottomRef = useRef(null)
  const { emit, on, off, isOnline } = useSocketContext()

  // Fetch messages
  useEffect(() => {
    if (!convo?._id) return
    setLoading(true)
    messageService.getMessages(convo._id)
      .then(({ data }) => setMessages(data.data.messages))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [convo?._id])

  // Join conversation room
  useEffect(() => {
    if (!convo?._id) return
    emit('conversation:join', convo._id)
  }, [convo?._id])

  // Listen for new messages
  useEffect(() => {
    const handler = ({ conversationId, message }) => {
      if (conversationId === convo?._id) {
        setMessages(m => {
          if (m.some(x => x._id === message._id)) return m
          return [...m, message]
        })
      }
    }
    on('message:new', handler)
    return () => off('message:new', handler)
  }, [convo?._id])

  // Typing indicator (from other user)
  useEffect(() => {
    const handler = ({ userId, isTyping }) => {
      if (userId !== convo?.participant?._id?.toString()) return
      setPeerTyping(isTyping)
    }
    on('message:typing', handler)
    return () => off('message:typing', handler)
  }, [convo?.participant?._id])

  // Handle typing (emit)
  const handleInputChange = (e) => {
    const value = e.target.value
    setInput(value)
    emit('message:typing', {
      conversationId: convo._id,
      isTyping: value.length > 0
    })
  }

  // Send message
  const send = async () => {
    const text = input.trim()
    if (!text || sending) return

    setInput('')
    setSending(true)

    try {
      const { data } = await messageService.sendMessage(convo._id, text)
      setMessages(m => [...m, data.data.message])

      // emit new message to socket
      emit('message:new', {
        conversationId: convo._id,
        message: data.data.message
      })

    } catch {
      console.log('Failed to send')
      setInput(text)
    } finally {
      setSending(false)
    }
  }

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, peerTyping])

  if (!convo)
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', fontFamily: 'JetBrains Mono,monospace', fontSize: 13 }}>
        Select a conversation
      </div>
    )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* Header */}
      <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ position: 'relative' }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg,rgba(0,210,255,.2),rgba(124,58,237,.2))', border: '1.5px solid rgba(0,210,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, color: '#00d2ff' }}>
            {convo.avatar}
          </div>
          {convo.online && (
            <div style={{ position: 'absolute', bottom: 1, right: 1, width: 9, height: 9, borderRadius: '50%', background: '#10b981', border: '1.5px solid #080909' }} />
          )}
        </div>

        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#f8fafc' }}>{convo.name}</div>
          <div style={{ fontSize: 10, color: convo.online ? '#10b981' : '#475569' }}>
            {convo.online ? '● Online' : '○ Offline'}
          </div>
        </div>

        <div style={{ marginLeft: 'auto' }}>
          <Button variant="ghost" size="sm">View profile</Button>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {messages.map((m, i) => (
          <MessageBubble key={i} message={m} convo={convo} />
        ))}

        {/* Typing Indicator */}
        {peerTyping && (
          <div style={{ fontSize: 12, color: '#64748b' }}>
            {convo?.name} is typing...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,.06)', display: 'flex', gap: 10 }}>
        <input
          value={input}
          onChange={handleInputChange}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder={`Message ${convo.name.split(' ')[0]}…`}
          style={{ flex: 1, padding: '10px', background: '#111214', borderRadius: 10, color: '#fff' }}
        />
        <Button onClick={send} disabled={!input.trim()}>
          Send →
        </Button>
      </div>
    </div>
  )
}