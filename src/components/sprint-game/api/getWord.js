const getWord = async (id, token, wordId) => {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/words/${wordId}`, {
    method: 'GET',
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  const content = await rawResponse.json();
  return content;
};

export { getWord as default };
