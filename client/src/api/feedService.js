import api from './axios'

export const feedService = {
  getFeed: (page = 1) =>
    api.get('/feed', { params: { page } }),

  createPost: (data) =>
    api.post('/feed', data),

  deletePost: (id) =>
    api.delete(`/feed/${id}`),

  toggleLike: (id) =>
    api.post(`/feed/${id}/like`),

  addComment: (id, text) =>
    api.post(`/feed/${id}/comment`, { text }),

  deleteComment: (id, commentId) =>
    api.delete(`/feed/${id}/comment/${commentId}`),
}

