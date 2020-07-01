import getUserWord from './getUserWord';

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

    if (result.status === 200){
      const content = result.json();
      
    const promise = new Promise((resolve, reject) => {
      resolve( content.then((elm) => {
        console.log(elm)
        let wordArr = new Array(elm.length);
        elm.map((el, i) => getUserWord(id, token, el.wordId).then((vl) => {wordArr[i] = vl}));
        return wordArr;
      }));
    });
      
    return {status: result.status, wordList: promise}

    } else {
      return {status: result.status};
    }

};

export { getUserAllWord as default };
