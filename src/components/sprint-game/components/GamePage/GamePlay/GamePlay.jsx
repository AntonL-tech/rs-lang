import React from 'react';
import s from './GamePlay.module.css';
import { Link } from 'react-router-dom';
import Points from './gameComponents/Points';
import imgAudioOn from '../../../files/img/audioOn.png';
import imgAudioOff from '../../../files/img/audioOff.png';
import imgSound from '../../../files/img/sound.png';

const GamePlay = (props) => {
    if (props.time > 60 ) {
        return <div className={`${s.time} ${s.timeStart}`}>
                    {props.time%60}
                </div> 
    }
    return (
        <div className={s.GameBlock}>
            <div className={s.header}>
                <div className={props.time > 5 ? s.time : `${s.time} ${s.timeRed}`}>
                    {props.time}
                </div>  
                <div className={s.score}>
                    {props.score}
                </div>
                <div className={s.linkBlock}>
                    <button className={s.audio} onClick={() => props.changeAudio()}>
                        {props.audioStatus ? <img src={imgAudioOn} alt=""/> : <img src={imgAudioOff} alt=""/> }
                    </button>
                    <Link className={s.link} to='/sprint/start'>
                        <div className={s.linkEl}>|</div>
                        <div className={s.linkEl}>|</div>
                    </Link>
                </div>
            </div>

            <div className={!props.classMark ? s.block
            : (props.goodWordsScore > 0  ? `${s.block} ${s.blockGood}` : `${s.block} ${s.blockBad}`)}>    
                <Points goodWordsScore={props.goodWordsScore}/>
                <button className={s.playWord} onClick={() => props.playAudioWord()}>
                    <img src={imgSound} alt=""/>
                </button>
                <div className={s.word}>
                    <div className={s.wordOriginal}> {props.wordEnglish} </div>
                    <div className={s.wordTranslate}> {props.gameWordTranslate} </div>
                </div>
                <button className={s.false} onClick={() => { props.checkWord(false) }}>неверно</button>
                <button className={s.true} onClick={() => { props.checkWord(true) }}>верно</button>
                <div>{props.status}</div>
            </div>
        </div>
    )
}
export default GamePlay;
