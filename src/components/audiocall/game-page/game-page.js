import React, { Component } from 'react';
import s from './game-page.module.css';
import WordList from '../word-list/word-list';
import Preloader from '../preloader/preloader';
import GameModel from '../game-model/game-model';
import error from '../assets/audio/error.mp3';
import correct from '../assets/audio/correct.mp3';

export default class GamePage extends Component {
  constructor(props) {
    super(props);
    this.level = this.props.level;
    this.correctAnswers = [];
    this.incorrectAnswers = [];
    this.currentSeries = 0;
    this.longestSeries = 0;
    this.state = {
      isQuestion: true,
      isCorrectAnswer: true,
      preloader: true,
      soundOn: true,
      bgColors: {r: 179, g: 213, b: 216},
      bgPercent: 40,
      degree: 0,
      step1: 213,
      step2: 100,
      step3: 71,
    }
  }

  // changeBackgroundColor = () => {
    
  // } 

  componentDidMount() {
    this.gameModel = new GameModel(this.level);
    this.gameModel.init().then((res) => {
      let [currentWord, answers] = res;
      this.setState({ currentWord, answers, preloader: false });
      this.playWord();
    })

    document.addEventListener("keydown", this.keyboardEvents);
    // console.log('add')
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyboardEvents);
    // console.log('remove')
  }

  pass = () => {
    this.incorrectAnswers.push(this.state.currentWord);    
    this.currentSeries = 0;
    this.playSound(error);
    this.setState({ isQuestion: false, isCorrectAnswer: false, answerId: undefined });
  }
  
  getAnswersSeries = () => {
    this.currentSeries += 1;
    
    if (this.currentSeries > this.longestSeries) {
      this.longestSeries = this.currentSeries;
    }
  }

  getAnswer = (event) => {    
    const { isQuestion, currentWord } = this.state;

    if (!isQuestion) return;

    const answer = event.target.dataset.correct;
    if (answer === 'true') {
      this.correctAnswers.push(currentWord);   
      this.getAnswersSeries();
      this.playSound(correct);  
    } else {
      this.incorrectAnswers.push(currentWord);  
      this.currentSeries = 0;
      this.playSound(error);  
    }

    const id = event.target.id;

    this.setState({ isQuestion: false, isCorrectAnswer: answer, answerId: id });
  }

  getAnswerByKeyboard = (event) => {
    const { isQuestion, currentWord, answers } = this.state;

    if (!isQuestion) return;

    const answer = this.state.answers[+event.key - 1].correct.toString();
    
    // console.log(event, this.state.answers[+event.key - 1], answer ,'1cons')


    if (answer === 'true') {
      this.correctAnswers.push(currentWord);   
      this.getAnswersSeries();
      this.playSound(correct);  
    } else {
      this.incorrectAnswers.push(currentWord);  
      this.currentSeries = 0;
      this.playSound(error);  
    }

    const id = answers[+event.key - 1].id;

    // console.log(answer, id)

    this.setState({ isQuestion: false, isCorrectAnswer: answer, answerId: id });
  }

  nextWord = () => {
    this.setState({preloader: true})
    const newPageData = this.gameModel.nextTurn();
    if(!newPageData) {
      this.props.showStatistics(this.correctAnswers, this.incorrectAnswers, this.longestSeries);
      return;
    }

    newPageData.then(([currentWord, answers]) => {
      const { bgColors: { r, g, b }, bgPercent, degree, step1, step2, step3 } = this.state;
      // console.log(typeof bgPercent, bgPercent, bgPercent + 3)
      this.setState({ isQuestion: true, currentWord, answers, preloader:false,
        // bgColors: { r: r - 2, g: g + 1, b: b - 3}
        // bgPercent: (bgPercent + 3) 
        step1: step1 + 2,
        step2: step2 - 3,
        step3: step3 - 1,
        // degree: degree + 5
      });          
      this.playWord();  
    }); 
  }

  nextWordByKeyboard = (event) => {
    console.log('here')
    if (event.key === 'Enter') {
      this.nextWord();
    }
  }

  playWord = () => {
    const { audio } = this.state.currentWord;
    this.audio = new Audio(`https://raw.githubusercontent.com/yrevtovich/rslang-data/master/${audio}`);
    this.audio.play();
  }

  switchSound = () => {
    this.setState(({soundOn: !this.state.soundOn}))
  }

  playSound = (sound) => {   
    if (!this.state.soundOn) return;

    const audio = new Audio(sound);
    audio.play();
  } 

  keyboardEvents = (event) => {
    console.log('here')
    const key = event.key;
    // console.log(event, key)
    

    switch (key) {
      case 'Enter':
        if (!this.state.isQuestion) {
          this.nextWord();
        } else {
          this.pass();
        }
        break;
      case '1':
        this.getAnswerByKeyboard(event);
        break;
      case '2':
        this.getAnswerByKeyboard(event);
        break; 
      case '3':
        this.getAnswerByKeyboard(event);
        break;
      case '4':
        this.getAnswerByKeyboard(event);
        break; 
      case '5':
        this.getAnswerByKeyboard(event);
        break;       
      default: 
        break;
    }
  }

  render() {
    const { preloader, bgColors, bgPercent, degree, step1, step2, step3 } = this.state;

    console.log(this.currentSeries, this.longestSeries);
    
    if (!preloader) {
      const { isQuestion, answers, answerId, isCorrectAnswer, currentWord : { image, wordTranslate }, soundOn , bgColors, bgPercent} = this.state;
      // console.log( bgPercent)

      return (
        <div className = {s.page} style={{backgroundColor:`hsl(${step1}, ${step2}%, ${step3}%)`}}>
          <button className={soundOn ? s.sound : `${s.sound} ${s.soundOff}`} onClick={this.switchSound} />
          <div className={s.gameWrapper}> 
            <div className={s.questionBoard}>
              <img className={isQuestion ? s.hidden : s.wordImg} src={`https://raw.githubusercontent.com/yrevtovich/rslang-data/master/${image}`} alt='word illustration'/>
              
              <div className={s.wordData}>
                <button className={isQuestion ? `${s.wordSound} ${s.wordSoundQuestion}` : s.wordSound} onClick={this.playWord}/>
                <p className={isQuestion ? s.hidden : s.translation}>{wordTranslate}</p>
              </div>
            </div>
  
            <WordList words={answers} callback={this.getAnswer} isQuestion={isQuestion} answer={isCorrectAnswer} answerId={answerId} /> 
            
            <button className={isQuestion ? s.pass : s.hidden} onClick={this.pass}>Pass</button>
            <button className={isQuestion ? s.hidden : s.next} type='button' onClick={this.nextWord} /*onKeyDown={this.nextWordByKeyboard}*/>Next word</button>
          </div>        
        </div>
      )
    }

    return (
      <div className = {s.page} style={{backgroundColor:`hsl(${step1}, 100%, 71%)`}}>
        <Preloader />
      </div>
    )
  }
  
  
}
