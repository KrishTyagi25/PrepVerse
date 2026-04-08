import api from './axios'

const notificationService = {
  getNotifications: () =>
    api.get('/notifications'),

  markRead: (id) =>
    api.patch(`/notifications/${id}/read`),

  markAllRead: () =>
    api.patch('/notifications/read-all'),

  deleteNotification: (id) =>
    api.delete(`/notifications/${id}`),
}

export default notificationService