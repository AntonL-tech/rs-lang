export async function getWords(page = 0, group = 0) {
  const resp = await fetch(
    `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`
  );
  return await resp.json();
}

export async function getUserWordsList(userId, token) {
  const rawResponse = await fetch(
    `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/`,
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

export async function getWordById(wordId) {
  const rawResponse = await fetch(
    `https://afternoon-falls-25894.herokuapp.com/words/${wordId}`
  );
  return await rawResponse.json();
}
