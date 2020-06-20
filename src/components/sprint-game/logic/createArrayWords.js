import state from './state';
import shuffle from './shuffle';
import getWords from '../api/getWords';

const createArrayWords = () => {
    let arr = new Array(30);
    arr = shuffle(arr.fill(1).map((el, i ) => el = i));
    let wordList = [];

    const get = (i = 0) => getWords(state.level - 1, arr[i]).then((el) => {
        const addWord = (arr, i) => {
            wordList = wordList.concat(arr);
            if (wordList.length > 60) {
                return wordList = shuffle(wordList);
            } else {
                return get(i += 1);
            }
        }    
        return addWord(el, i);
    });

    return get();
}

export { createArrayWords as default };
