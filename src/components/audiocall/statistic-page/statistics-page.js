import React, { Component } from 'react';
import s from './statistics-page.module.css';

const List = ({ words, playAudio }) => {  
  const wordList = words.map((item) => {

    return (
      <li className={s.wordBlock} key={item.id} id={item.id}>
        <p className={s.wordBlockItem}>{item.word}</p>
        <p className={s.wordBlockItem}>{item.wordTranslate}</p>
        <button className={s.soundBtn} data-audio={item.audio} onClick={playAudio} />
      </li>
    )
  })

  return <ul className={s.answersList}>{wordList}</ul>
}

export default class StatisticsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: true,
    }
  }

  playAudio = (event) => {
    const audioPath = event.target.dataset.audio;
    const audio = new Audio(`https://raw.githubusercontent.com/yrevtovich/rslang-data/master/${audioPath}`);
    audio.play();
  }

  render() {
    const { correctAnswers, incorrectAnswers, level,  showStartPage } = this.props;

    return (
      <div className={s.page}>
        <div className={s.results}>
          <p className={s.header}>Statistics</p>
          <p className={s.info}>Level: {level}, Amount of words: {correctAnswers.length + incorrectAnswers.length}</p>
        
          <div className={s.answers}>          
            <div className={s.answersBlock}>
              <p className={s.answersTitle}>Correct: {correctAnswers.length}</p>
              <List words={correctAnswers} playAudio={this.playAudio} />
            </div>
        
            <div className={s.answersBlock}>
              <p className={s.answersTitle}>Incorrect: {incorrectAnswers.length}</p>
              <List words={incorrectAnswers}  playAudio={this.playAudio} />
            </div>
          </div>

          <div className={s.buttons}>
            <button className={s.btn} onClick={showStartPage}>Play again</button>
            <button className={s.btn}>Return</button>
          </div>
        </div>
        
      </div>
    )
  
  }
  
}
