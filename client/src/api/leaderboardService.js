import api from './axios'

const leaderboardService = {
  getGlobal: (params) =>
    api.get('/leaderboard/global', { params }),

  getFriends: () =>
    api.get('/leaderboard/friends'),

  getMyRank: () =>
    api.get('/leaderboard/my-rank'),

  getPlatformStats: () =>
    api.get('/leaderboard/stats'),
}

export default leaderboardService