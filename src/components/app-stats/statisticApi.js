export async function updateUserStatistic(
  userId,
  token,
  { gameName, correct, series }
) {
  let statistic = await getUserStatistic(userId, token);

  let gameStatistics = statistic.optional ? statistic.optional[gameName] : [];

  gameStatistics = gameStatistics || [];

  gameStatistics = gameStatistics.slice(-10);

  gameStatistics.push({
    correct,
    series,
  });

  statistic = {
    optional: {
      [gameName]: gameStatistics,
    },
  };

  console.log('statistic', statistic);
  const body = JSON.stringify(statistic);
  console.log('body', body);

  const rawResponse = await fetch(
    `https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`,
    {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      body: body,
    }
  );

  return await rawResponse.json();
}

export async function getUserStatistic(userId, token) {
  const rawResponse = await fetch(
    `https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`,
    {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    }
  );
  return await rawResponse.json();
}

export async function updateUserMiniStatistic(name, correct, series) {
  let stat = { name, correct, series };
  console.log(stat);
}

export async function updateRSLangStatistic(learnedWordsCount) {
  let stat = { learnedWordsCount };
  console.log(stat);
}

export async function setZeroUserStatistics(userId, token) {
  const zeroStatistics = {
    learnedWords: 0,
    optional: {
      main: {
        name: 'RSLang',
        stats: [],
      },
      speakit: {
        name: 'Speak It',
        stats: [],
      },
      sprint: {
        name: 'Sprint',
        stats: [],
      },
      savannah: {
        name: 'Savannah',
        stats: [],
      },
      audiocall: {
        name: 'Audiocall',
        stats: [],
      },
      wordConstructor: {
        name: 'wordConstructor',
        stats: [],
      },
      englishPuzzle: {
        name: 'English Puzzle',
        stats: [],
      },
    },
  };

  const rawResponse = await fetch(
    `https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`,
    {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      body: JSON.stringify(zeroStatistics),
    }
  );
  return await rawResponse.json();
}
