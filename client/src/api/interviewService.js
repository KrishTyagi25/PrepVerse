import api from './axios'

export const interviewService = {
  saveInterview: (data)  => api.post('/interview/save', data),
  getHistory:    ()      => api.get('/interview/history'),
  getStats:      ()      => api.get('/interview/stats'),
}