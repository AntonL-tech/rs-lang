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
