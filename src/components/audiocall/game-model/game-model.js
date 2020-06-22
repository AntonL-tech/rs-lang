export default class GameModel {
  constructor(level = 0, round = 0) {
    this.turns = 10;
    this.currentTurn = 0;
    this.amountOfPages = 30;
    this.level = level;
    this.round = round;
    this.currentWord = null;
    this.questionWords = null;
    this.answerWords = null;
    this.answers = {};
  }

  // getUserWords = () => {
  //   return fetch('../src/components/audiocall/game-model/data.json')
  //     .then((response) => {
  //       if (!response.ok)  {
  //         throw new Error('error');
  //       }      
  //       console.log(response)  
  //       // return response.json();
  //       })
  //     .catch((error) => console.log(error.message))
  // }

  getCollectionWords = (level, page) => {
    return fetch(`https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${level}`)
      .then((response) => {
        if (!response.ok)  {
          throw new Error('error');
        }        
        return response.json();
        })
      .catch((error) => console.log(error.message))
  }

  shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]];
    }    
  }

  getRandomNumber = (length) => {
    return Math.round(Math.random() * (length - 1));
  }

  // filterUserWords = (level) => {
  //   return this.getUserWords().then((res) => {
  //     console.log(res)
  //     return res.filter((item) => item.group === level)
  //   })
  // }

  getRandomPages = () => {
    const pagesArr = [];

    for (let i = 0; i < (Math.floor(this.turns / 2)); ) {
      const page = this.getRandomNumber(this.amountOfPages);
      const isRepeat = pagesArr.find((item) => item === page);

      if (!isRepeat && !(page === this.round)) {
        pagesArr.push(page)
        i++;
      }
    }
    console.log(pagesArr)
    return pagesArr;
  }

  createAnswerWordsArr = () => {
    const requestArr = [];
    const pagesArr = this.getRandomPages();

    pagesArr.forEach((page) => {
      requestArr.push(this.getCollectionWords(this.level, page))});

    return Promise.all(requestArr).then((response) => response.flat())
  }

  generateWrongAnswersArr = (words) => {
    let answers = [];
    for (let i = 0; i < 4; i++) {
      const index = this.getRandomNumber(words);
      answers.push(words.splice(index, 1));
    }

    return answers;
  }

  transformWrongAnswersData = (answers) => {
    return answers.map((item) => { 
      const {wordTranslate, id} = item[0];
      return {wordTranslate, id, correct: false};
    })
  }

  generateGamePageData = () => {
    this.currentWord = this.questionWords[this.currentTurn];

    // подбираем схожие по длине слова
    const words = this.filterWordsByLength(this.currentWord, this.answerWords); 

    // формируем массив неправильных ответов
    let answers = this.generateWrongAnswersArr(words);

    // приводим данные к удобному формату 
    answers = this.transformWrongAnswersData(answers);

    // добавляем правильный вариант
    const {wordTranslate, id} =  this.currentWord;
    answers.push({wordTranslate, id, correct: true})

    this.shuffle(answers);

    return [this.currentWord, answers];
  }

  init = () => {
    return Promise.all([this.getCollectionWords(this.level, this.round), this.createAnswerWordsArr()])
      .then((res) => {
        [this.questionWords, this.answerWords] = res;
        return this.generateGamePageData();
      })
  }

  filterWordsByLength = (currentWord, wordsArr) => {
    const length = currentWord.wordTranslate.length;
    const words = wordsArr.map((item) => {
      const {wordTranslate, id} = item;
      return {wordTranslate, id}
    });

    return words.filter((item) => {
      const translation = item.wordTranslate.length;
      return (translation >= (length - 1) && translation <= (length + 1));
    });
  }

  registrateAnswer = (answer) => {
    this.answers[this.currentTurn] = answer;
    console.log(this.answers)
  }

  nextTurn = () => {
    if (this.currentTurn === this.turns) return;
    this.currentTurn++;
    this.currentWord = this.questionWords[this.currentTurn];
    return this.generateGamePageData();
  }

}
