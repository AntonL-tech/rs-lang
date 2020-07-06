import React from 'react';
import s from './GamePlay.module.css';
import { Link } from 'react-router-dom';
import imgAudioOn from '../../../files/img/audioOn.png';
import imgAudioOff from '../../../files/img/audioOff.png';
import imgSound from '../../../files/img/sound.png';
import heart from '../../../files/img/heart.png';

const createObj = (arr) => {
    let newArr = arr;
    let arrObj = []
    let n = 0
    while(newArr.length > 0){
      const i = 0
      const litter = newArr[i]
      while(newArr.indexOf(litter) !== -1) {
        arrObj[n] = {a: litter, n: arrObj[n] ? arrObj[n].n+1 : 1}
        newArr.splice(newArr.indexOf(litter), 1)
      }
      n += 1
    }
    return arrObj
  }

const block = 'block';
const bad = 'bad';
const GamePlay = (props) => {
    const wordLetters = createObj([...props.wordLetters])
    if (props.time > 60 ) {
        return <div className={`${s.time} ${s.timeStart}`}>
                    {props.time%60}
                </div> 
    }
    const width = {'width': `${props.success > 29 ? 100 : ((100 / 5) * (props.success % 6))}%`}
    return (
        <div className={s.GameBlock}>
            <div className={s.header}>
                <div className={props.time > 5 ? s.time : `${s.time} ${s.timeRed}`}>
                    {props.time}
                </div>  
                <div className={s.score}>
                    {props.score}<br/>
                </div>
                <div className={s.linkBlock}>
                    <button className={s.audio} onClick={() => props.changeAudio()}>
                        {props.audioStatus ? <img src={imgAudioOn} alt=""/> : <img src={imgAudioOff} alt=""/> }
                    </button>
                    <Link className={s.link} onClick={() => props.stopGame()} to='/constructor/start'>
                        <div className={s.linkEl}>|</div>
                        <div className={s.linkEl}>|</div>
                    </Link>
                </div>
            </div>

            <div className={props.classMark === block ? s.block
            : (props.classMark === bad  ? `${s.block} ${s.blockBad}` : `${s.block} ${s.blockGood}`)}>
                <div className={s.heart}>
                    <img src={heart} alt=""/>
                    <div className={s.lives}>
                        {props.lives}
                    </div>
                </div>
                <button className={s.playWord} onClick={() => props.playAudioWord()}>
                    <img src={imgSound} alt=""/>
                </button>
                <div className={s.success}>
                    <div className={s.level}>level {props.level + 1}</div>
                    <div className={s.successLoader}>
                        <div className={s.successProgress} style={width}></div>
                    </div>
                </div>
                <div className={s.word}>
                    <div className={s.wordOriginal}> {props.wordTranslate} </div>
                    <div className={s.wordTranslate}> {props.transcription} </div>
                </div>
                <div className={s.wordArr}>
                {props.word.map((el, i) => {
                        return <div key={i} className={s.letterBlock}>
                                    {el ? el : ''}
                                </div>
                    })}
                </div>
                <div className={s.wordArr}>
                    {wordLetters.map((el, i) => {
                        const letter = el;
                            return <div key={i} className={s.wordLetterBlock}
                                        onClick={() => props.checkWord(letter.a)}>
                                        {letter.a}
                                        {letter.n > 1 ? <div className={s.litterNum}>{letter.n}</div> : ''}
                                    </div>
                        })} 
                </div>
                {props.wordText}
            </div>
        </div>
    )
}
export default GamePlay;
