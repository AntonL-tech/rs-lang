const getWords = async (group, page) => {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`, {
    method: 'GET',
    withCredentials: true,
    headers: {
      Accept: 'application/json',
    },
  });
  const content = await rawResponse.json();
  return content;
};

export { getWords as default };
