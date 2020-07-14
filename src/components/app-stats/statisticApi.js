export async function updateUserStatistic(name, stat) {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  let statistic = await getUserStatistic(userId, token);

  console.log('get statistic', statistic);

  if (statistic.optional[name].stats.length > 0) {
    let lastStat =
      statistic.optional[name].stats[statistic.optional[name].stats.length - 1];

    if (lastStat.date.toLocaleDateString() === stat.date.toLocaleDateString()) {
      lastStat.correct =
        lastStat.correct > stat.correct ? lastStat.correct : stat.correct;
      lastStat.series =
        lastStat.series > stat.series ? lastStat.series : stat.series;
    } else {
      statistic.optional[name].stats.push(stat);
    }
  } else {
    statistic.optional[name].stats.push(stat);
  }

  // delete statistic.id;

  console.log(statistic);

  const rawResponse = await fetch(
    `https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`,
    {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      body: JSON.stringify(statistic),
    }
  );

  let result = await rawResponse.json();

  console.log('result', result);

  return result;
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
  const date = new Date();
  let stat = { date, correct, series };

  updateUserStatistic(name, stat);
}

export async function updateRSLangStatistic(learnedWordsCount) {
  const date = new Date();
  let stat = { date, learnedWordsCount };

  updateUserStatistic('main', stat);
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
