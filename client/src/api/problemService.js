import api from './axios'

export const problemService = {
  getProblems: (filters) =>
    api.get('/problems', { params: filters }),

  getDailyProblem: () =>
    api.get('/problems/daily'),

  getProblemById: (id) =>
    api.get(`/problems/${id}`),

  runCode: (id, code, language) =>
    api.post(`/problems/${id}/run`, { code, language }),

  submitSolution: (id, code, language) =>
    api.post(`/problems/${id}/submit`, { code, language }),

  getMySubmissions: (id) =>
    api.get(`/problems/${id}/submissions`),

  getMyStats: () =>
    api.get('/problems/stats'),
}

