import React, { Component } from 'react';
import s from './game-page.module.css';
import WordList from '../word-list/word-list';
// import GameModel from '../game-model/game-model';

export default class GamePage extends Component {
  constructor(props) {
    super(props);
    this.gameModel = this.props.gameModel;
    this.state = {
      isQuestion: true,
      currentWord: this.props.currentWord,
      answers: this.props.answers,
      isCorrectAnswer: true,
      answerId: null,
    }
  }

  componentDidMount() {
    this.playAudio(this.state.currentWord.audio)
  }
  
  playWordSound = (event) => {
    if (this.audio) {
      this.audio.pause();
    }
    this.playAudio(event.target.dataset.audio);
  }

  pass = () => {
    this.gameModel.registrateAnswer(false);
    this.setState({isQuestion: false, isCorrectAnswer: false, answerId: undefined});
  }

  getAnswer = (event) => {    
    if (!this.state.isQuestion) return;

    const answer = event.target.dataset.correct;
    const id = event.target.id;

    this.gameModel.registrateAnswer(answer);
    this.setState({isQuestion: false, isCorrectAnswer: answer, answerId: id});
  }

  nextWord = () => {
    console.log('next word')
    const newPageData = this.gameModel.nextTurn();

    if(!newPageData) return;

    const [currentWord, answers] = newPageData;
    this.setState({isQuestion: true, currentWord, answers});
    
    this.playAudio(currentWord.audio);
  }

  playAudio = (audio) => {
    this.audio = new Audio(`https://raw.githubusercontent.com/yrevtovich/rslang-data/master/${audio}`);
    this.audio.play();
  }

  render() {
    const {audio, image, wordTranslate} = this.state.currentWord;

    const classNames = {
      img: s.wordImg,
      btnPass: s.pass,
      btnNext: s.next,
      btnWordSound: s.wordSound,
      translation: s.translation,
    }
    
    if (this.state.isQuestion) {
      classNames.img = s.hidden;
      classNames.btnNext = s.hidden;
      classNames.translation = s.hidden;
    } else {      
      classNames.btnPass = s.hidden;
    }

    return (
      <div className = {s.page}>
        <button className={s.sound} onClick={this.playSound} data-audio={``}/>
        <div className={s.gameWrapper}>
          <div className={s.questionBoard}>
            <img className={classNames.img} src={`https://raw.githubusercontent.com/yrevtovich/rslang-data/master/${image}`} alt='word illustration'/>
            
            <div className={s.wordData}>
              <button className={s.wordSound} onClick={this.playWordSound} data-audio={audio}/>
              <p className={classNames.translation}>{wordTranslate}</p>
            </div>
          </div>

          <WordList words={this.state.answers} callback={this.getAnswer} isQuestion={this.state.isQuestion} answer={this.state.isCorrectAnswer} answerId={this.state.answerId} /> 
          <button className={classNames.btnPass} onClick={this.pass}>Не знаю</button>
          <button className={classNames.btnNext} onClick={this.nextWord}>Следующее</button>
        </div>        
      </div>
    )
  }
}
