import api from './axios'

export const userService = {
  getProfile: (id) =>
    api.get(`/users/profile/${id}`),

  updateProfile: (data) =>
    api.put('/users/profile', data),

  updateAvatar: (formData) =>
    api.put('/users/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  searchUsers: (query) =>
    api.get('/users/search', { params: { q: query } }),

  sendConnectionRequest: (id) =>
    api.post(`/users/connect/${id}`),

  acceptConnection: (id) =>
    api.post(`/users/accept/${id}`),

  removeConnection: (id) =>
    api.delete(`/users/disconnect/${id}`),

  completeOnboarding: (data) =>
    api.post('/users/onboarding', data),
}

