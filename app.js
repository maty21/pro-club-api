const proClubsApi = require("./lib/index");
const stub = require("./stub/data");

const run = async () => {
  proClubsApi.club.platformType("XBOXONE");
  //const resp = await proClubsApi.club.getClubInfo('1679403');
  const clubId = await proClubsApi.club.getClubIdByName("maccabi haifa12");
  const resp = await proClubsApi.club.getClubInfo(clubId.id);
  const membersStats = await proClubsApi.club.getClubMemberStats(clubId.id);
  const matches = await proClubsApi.club.getClubMatchHistory(clubId.id);
  const seasonalStats = await proClubsApi.club.getClubSeasonStats(clubId.id);
  const memberStat = await proClubsApi.member.getMembersStats(
    "_SZLEQTI3zZwcZkwQxFg1Q!!:NTumR8n2HNqVIPsyuocEhQ!!"
  );
  console.log({ clubId, resp, membersStats, matches, seasonalStats });
  const data = aggregate({
    clubId,
    resp,
    membersStats,
    matches,
    seasonalStats
  });
  console.log(JSON.stringify(data));
};
//badge = https://fifa19.content.easports.com/fifa/fltOnlineAssets/68053afe-ae8a-41bc-86b6-01c53b7155dd/2019/fifaweb/crests/256x256/{teamID}.png

const runStub = ({ clubId, resp, membersStats, matches, seasonalStats }) => {
  const data = aggregate({
    clubId,
    resp,
    membersStats,
    matches,
    seasonalStats
  });
  console.log(JSON.stringify(data));
};

const aggregate = ({ clubId, resp, membersStats, matches, seasonalStats }) => {
  const { wins, seasons, ties, losses, titlesWon } = clubId.res.raw[clubId.id];
  return {
    clubDetais: {
      name: clubId.res.raw[clubId.id].name,
      id: clubId.id,
      stats: { wins, seasons, ties, losses, titlesWon }
    },
    matches: _setMatches(Object.values(matches.raw), clubId.id),
    membersStats: Object.values(membersStats.raw)
  };
};

const _setMatches = (matches, id) => {
  return Object.values(matches).map(m => setMatch(m, id));
};

const setMatch = (match, clubId) => {
  const { timeAgo, players, clubs, aggregate } = match;
  const opponentId = Object.keys(aggregate).find(id => id !== clubId);
  const {
    assists,
    goals,
    passattempts,
    passesmade,
    shots,
    redcards
  } = aggregate[clubId];

  return {
    timeAgo,
    team: _matchDataForTeam({
      players: players[clubId],
      clubs: clubs[clubId],
      aggregate: aggregate[clubId],
      id: clubId
    }),
    opponent: _matchDataForTeam({
      players: players[opponentId],
      clubs: clubs[opponentId],
      aggregate: aggregate[opponentId],
      id: opponentId
    }),
    result: {
      status: _getResult(clubs[clubId]),
      goal: clubs[clubId].goals,
      goalsAgainst: clubs[clubId].goalsAgainst
    }
  };
};

const _matchDataForTeam = ({ players, clubs, aggregate, id }) => ({
  stats: _teamStats(aggregate),
  data: _teamData(clubs),
  playersDetails: Object.entries(players).map(player =>
    _playerDetailsInMatch(player[0], player[1])
  )
});
const _teamStats = data => {
  const { assists, goals, passattempts, passesmade, shots, redcards } = data;
  return { assists, goals, passattempts, passesmade, shots, redcards };
};

const _teamData = data => {
  const { gameNumber, losses, ties, details } = data;
  const { name, teamId } = details;
  return {
    gameNumber,
    // goals,
    // goalsAgainst,
    losses,
    ties,
    details,
    name,
    teamId
  };
};
const _playerDetailsInMatch = (blazeId, data) => {
  const {
    assists,
    goals,
    passattempts,
    passesmade,
    playername,
    pos,
    rating,
    shots,
    tackleattempts,
    tacklesmade
  } = data;
  return {
    blazeId,
    assists,
    goals,
    passattempts,
    passesmade,
    playername,
    pos,
    rating,
    shots,
    tackleattempts,
    tacklesmade,
    passAccuracy: passesmade / passattempts,
    tackleAccuracy: tacklesmade / tackleattempts
  };
};
const _getResult = ({ goals, goalsAgainst }) =>
  goals > goalsAgainst ? "win" : goalsAgainst < goals ? "lose" : "tie";
run();

//runStub(stub)
