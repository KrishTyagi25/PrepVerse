import api from "./axios";

export const userService = {
  getProfile: (id) => api.get(`/users/profile/${id}`),

  updateProfile: (data) => api.put("/users/profile", data),

  updateAvatar: (formData) =>
    api.put("/users/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  searchUsers: (query) => api.get("/users/search", { params: { q: query } }),

  sendConnectionRequest: (id) => api.post(`/users/connect/${id}`),

  acceptConnection: (id) => api.post(`/users/accept/${id}`),

  removeConnection: (id) => api.delete(`/users/disconnect/${id}`),

  completeOnboarding: (data) => api.post("/users/onboarding", data),
  getResume: () => api.get("/users/resume"),
  saveResume: (data) => api.put("/users/resume", data),
  getRoadmap: () => api.get("/users/roadmap"),
  saveRoadmap: (data) => api.put("/users/roadmap", data),
  getProjects: () => api.get("/users/projects"),
  saveProjects: (data) => api.put("/users/projects", data),
  getNotifPrefs: () => api.get('/users/notification-prefs'),
  saveNotifPrefs: (data) => api.put('/users/notification-prefs', data),
};
