import api from './axios'

// Messages routes are commented out in backend
// Wire this up once messageController is ready
export const messageService = {
  getConversations: () =>
    api.get('/messages/conversations'),

  startConversation: (userId) =>
    api.post('/messages/conversations', { userId }),

  getMessages: (conversationId) =>
    api.get(`/messages/${conversationId}`),

  sendMessage: (conversationId, text) =>
    api.post(`/messages/${conversationId}`, { text }),
}

