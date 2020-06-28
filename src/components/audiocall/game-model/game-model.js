export default class GameModel {
  constructor(level = 0, round = 0) {
    this.turns = 19;
    this.currentTurn = 0;
    this.amountOfPages = 30;
    this.maxLevel = 6;
    this.level = level;
    this.round = round;
    this.currentWord = null;
    this.questionWords = [];
    this.answerWords = [];
    this.usedPages = [];
  }

  init = () => {
    return this.getQuestionWords()
      .then((res) => {
        this.questionWords = res;
        this.shuffle(this.questionWords);
        this.currentWord = this.questionWords[this.currentTurn];

        return this.getAnswerWordsArr(Math.round(this.turns / 2));
      })
      .then((res) => {
        this.answerWords = res;
        const wordsArr = this.filterWordsByPartOfSpeech(this.answerWords);

        return this.generateWrongAnswersData();        
      })
  }

  nextTurn = () => {
    if (this.currentTurn === this.turns) return;
    this.currentTurn++;
    this.currentWord = this.questionWords[this.currentTurn];
    
    return this.generateWrongAnswersData();
  }

  getCollectionWords = (level, page) => {
    return fetch(`https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${level}`)
      .then((response) => response.json());
  }

  getQuestionWords = () => {
    this.round = this.getRandomNumber(this.amountOfPages);
    this.usedPages.push([this.level, this.round]);

    return this.getCollectionWords(this.level, this.round)
      .then((words) => this.setWordsPartOfSpeech(words));
  }

  getAnswerWordsArr = (pages) => {
    const requestArr = [];
    const pagesArr = this.getRandomPages(pages);

    pagesArr.forEach((pageData) => {
      const [level, page] = pageData;
      requestArr.push(this.getCollectionWords(level, page))
    });

    return Promise.all(requestArr)
      .then((response) => {
        const answerWords = response.flat();
        return this.setWordsPartOfSpeech(answerWords);
      })
  }

  generateWrongAnswersData = () => {
    const wordsArr = this.filterWordsByPartOfSpeech(this.answerWords);

    if (wordsArr.length < 4) {
      return this.getAnswerWordsArr(1).then((res) => {
        this.answerWords.push(...res);
        return this.generateWrongAnswersData();
      })
    } else {
      let words = this.filterWordsByLength(this.currentWord, wordsArr); 

      let answers = this.getRandomAnswers(words);
      answers = this.transformWrongAnswersData(answers);  

      if (this.currentTurn < (this.turns / 2) && this.answerWords.length < 2000) {
        this.getAnswerWordsArr(5).then((res) => {
          this.answerWords.push(...res);
        });
      }

      const { wordTranslate, id } =  this.currentWord;
      answers.push({ wordTranslate, id, correct: true });      
      this.shuffle(answers);
      
      return new Promise((resolve) => resolve([this.currentWord, answers]));
    }
  }  

  filterWordsByPartOfSpeech = (words) => {
    const wordsArr = words.filter((word) => word.partOfSpeech === this.currentWord.partOfSpeech);          
    return wordsArr;
  }  
  
  filterWordsByLength = (currentWord, wordsArr) => {    
    const length = currentWord.wordTranslate.length;

    let words = wordsArr.filter((item) => {
      const translation = item.wordTranslate.length;
      return (translation >= (length - 1) && translation <= (length + 1));
    });
    
    if (words.length < 4) {
      words = wordsArr;
    } 

    return words;      
  }  

  getRandomAnswers = (words) => {
    let answers = [];
    for (let i = 0; i < 4; i++) {
      const index = this.getRandomNumber(words);
      answers.push(words.splice(index, 1));
    }

    return answers;
  }

  transformWrongAnswersData = (answers) => {
    return answers.map((item) => { 
      const { wordTranslate, id } = item[0];
      return { wordTranslate, id, correct: false };
    })
  }  

  setWordsPartOfSpeech = (words) => {
    words =  words.map((wordData) => {   
      return this.getPartOfSpeech(wordData);
    })

    return Promise.all(words).then((res) => res.flat())    
  }

  getPartOfSpeech = (wordData) => {
    const { word, wordTranslate } = wordData;

    return fetch(`https://dictionary.skyeng.ru/api/public/v1/words/search?search=${word}`)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        let wordReq = res.find((item) => item.text === word);
        if (!wordReq) {
          wordReq = res[0];
        }
        
        const meanings = wordReq.meanings;
        const wordMeaning = meanings.find((meaning) => meaning.translation.text === wordTranslate);

        if (wordMeaning)  {
          wordData.partOfSpeech = wordMeaning.partOfSpeechCode;
        } else {
          wordData.partOfSpeech = meanings[0].partOfSpeechCode;
          wordData.wordTranslate =  meanings[0].translation.text;
        }

        return wordData;
      });
  }

  getRandomNumber = (length) => {
    return Math.round(Math.random() * (length - 1));
  }
  
  shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]];
    }    
  }

  getRandomPages = (pages) => {
    const pagesArr = [];

    for (let i = 0; i < pages; ) {
      const page = this.getRandomNumber(this.amountOfPages);
      const level = this.getRandomNumber(this.maxLevel);
      let isRepeat = pagesArr.find(([itemLevel, itemPage]) => itemLevel === level && itemPage === page);
      if(!isRepeat) {
        isRepeat = this.usedPages.find(([itemLevel, itemPage]) => itemLevel === level && itemPage === page);
      }

      if (!isRepeat) {
        pagesArr.push([level, page]);
        this.usedPages.push([level, page]);
        i++;
      }
    }

    return pagesArr;
  }  
}
