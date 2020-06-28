import React, { Component } from 'react';
import s from './statistics-page.module.css';

const List = ({words, playAudio}) => {  
  const wordList = words.map((item) => {
    let classNames = s.wordBlock;

    return (
      <li className={classNames} key={item.id} id={item.id}>
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
    const { correctAnswers, incorrectAnswers, level } = this.props;

    return (
      <div className={s.page}>
        <p className={s.header}>Statistics</p>
        <p className={s.info}>Level: {level}, Amount of words: {correctAnswers.length + incorrectAnswers.length}</p>
        
        <div className={s.answers}>          
          <div className={s.answersCorrect}>
            <p className={s.answersTitle}>Correct: {correctAnswers.length}</p>
            <List words={correctAnswers} playAudio={this.playAudio} />
          </div>
        
          <div className={s.answersIncorrect}>
            <p className={s.answersTitle}>Incorrect: {incorrectAnswers.length}</p>
            <List words={incorrectAnswers}  playAudio={this.playAudio} />
          </div>
        </div>
      </div>
    )
  
  }
  
}
