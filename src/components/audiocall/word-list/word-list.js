import React from 'react';
import s from './word-list.module.css';

const WordList = ({words, callback, isQuestion, answer, answerId}) => {
  
  const wordList = words.map((item) => {
    let classNames = s.wordItem;

    if (!isQuestion) {
      classNames = s.wordItemInactive;
      if (answer === 'true') {
        if (item.correct) {
          classNames += ` ${s.correctSelected}`;
        }   
      } else {      
        if (item.correct) {
          classNames += ` ${s.correct}`;
        }  else if (item.id === answerId) {
          classNames += ` ${s.incorrect}`;
        } 
      }
    }

    return <li className={classNames} onClick={callback} data-correct={item.correct} key={item.id} id={item.id}>{item.wordTranslate}</li>
  })

  return <ul className={s.wordList}>{wordList}</ul>
}

export default WordList;