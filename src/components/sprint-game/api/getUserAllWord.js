import getUserWord from './getUserWord';

const getUserAllWord = async (id, token) => {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${id}/words`, {
    method: 'GET',
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  const status = await rawResponse.status;
  const content = await rawResponse.json();

  if(status === 200){
    let wordArr = []
    const promise = new Promise((resolve, reject) => {
        resolve(content.map((el, i) => getUserWord(id, token, el.wordId).then((vl) => wordArr[i] = vl)));
    });
    return {status: status, wordList: promise.then(() => wordArr)}
  } else {
    return {status: status};
  }
  
};

export { getUserAllWord as default };
