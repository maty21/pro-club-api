const api = require('./api');

function* values(obj) {
  for (let prop of Object.keys(obj)) { yield obj[prop] }
}

const platformType = platform => api.newPlatformType(platform);


const getClubIdByName = async query => {
  const res = await api.get(`clubsComplete/${query}`);
  return { res, id: Object.values(res.raw)[0].clubId }
};

const getClubMembers = async clubId => {
  const res = await api.get(`clubs/${clubId}/members`);
  return Array.from(values(res))
};

const getClubMemberStats = clubId => api.get(`clubs/${clubId}/membersComplete`);

const getClubSeasonRank = clubId => api.get(`clubs/${clubId}/seasonRank`);

const getClubSeasonStats = clubId => api.get(`clubs/${clubId}/seasonRank`);

const getClubStats = clubId => api.get(`clubs/${clubId}/stats`);

const getClubMatchHistory = clubId => api.get(`clubs/${clubId}/matches`);

const getClubInfo = clubId => api.get(`clubs/${clubId}/info`);

module.exports = {
  platformType,
  getClubIdByName,
  getClubMembers,
  getClubMemberStats,
  getClubSeasonRank,
  getClubSeasonStats,
  getClubStats,
  getClubMatchHistory,
  getClubInfo,
};