import { getWords, getUserWordsList, getWordById } from './clientApi';

const MAX_PAGE = 29;
const MIN_PAGE = 0;

export default class WordsService {
  constructor() {
    this.userID = localStorage.getItem('userId');
    this.token = localStorage.getItem('token');
  }

  async getUserWordsCount() {
    let words = await getUserWordsList(this.userID, this.token);
    return words.length;
  }

  async getRndUserWords() {
    let wordsList = await getUserWordsList(this.userID, this.token);
    wordsList = wordsList.slice(0, 10);

    const words = await Promise.all(
      wordsList.map((word) => {
        return getWordById(word.wordId);
      })
    );

    return this.getTenRndWords(words);
  }

  async getRndWordsFromGroup(group) {
    const rndPage = this.rnd(MIN_PAGE, MAX_PAGE);
    const words = await getWords(rndPage, group);
    return this.getTenRndWords(words);
  }

  getTenRndWords(words) {
    this.shuffle(words);
    return words.slice(0, 10).map((word) => this.convertWord(word));
  }

  rnd(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  convertWord(word) {
    return {
      word: word.word,
      transcription: word.transcription,
      translate: word.wordTranslate,
      id: word.id,
      image: `https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${word.image}`,
      audio: `https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${word.audio}`,
      guessed: false,
    };
  }
}
