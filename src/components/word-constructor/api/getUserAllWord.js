const getUserAllWord = async (id, token) => {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${id}/words`, {
    method: 'GET',
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token}`,
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
  const result = await rawResponse;

  if (result.status === 200) {
    const content = result.json();
    return { status: result.status, wordList: content }
  }
  return { status: result.status };
};

export { getUserAllWord as default };
