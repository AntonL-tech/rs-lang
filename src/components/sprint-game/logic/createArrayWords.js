import shuffle from './shuffle';
import getWords from '../api/getWords';
import getUserAllWord from '../api/getUserAllWord';
import getUserWord from '../api/getUserWord';

const user = 'user';

const createArrayWords = (level = 1, list = []) => {
    
    const id = localStorage.userId;
    const token = localStorage.token

    let arr = new Array(30);
    arr = shuffle(arr.fill(1).map((el, i ) => el = i));
    let wordList = [];
    const num = Math.ceil(Math.random() * 20 + 30)
    let arrBool = new Array(80);
    arrBool = shuffle(arrBool.fill(1).map((el, i ) => el = i < num ? true : false));

    const createGameArr = (arr) => {
        arr.forEach((el, i) => {
            el.wordStatus = arrBool[i];
            el.gameWordTranslate = arrBool[i] ? el.wordTranslate : arr[(i+4)%80].wordTranslate;
        })
        return arr = shuffle(arr);
    }

        if(level === user){
            wordList = shuffle(list).slice(0, 80)
            let requests = wordList.map((el, i) => getUserWord(id, token, el.wordId).then((vl) => {
                return vl
            }))
            return Promise.all(requests).then(responses => createGameArr(responses))
        } else {
            const get = (i = 0) => getWords(level - 1, arr[i]).then((el) => {
                const addWord = (arr, i) => {
                    wordList = wordList.concat(arr);
                    if (wordList.length > 60) {
                        return createGameArr(wordList)
                    } else {
                        return get(i += 1);
                    }
                }    
                return addWord(el, i);
            });
            return get();
        }
}

export { createArrayWords as default };
