import React from 'react';
import s from './GamePlay.module.css';
import { Link } from 'react-router-dom';
import Points from './gameComponents/Points';

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
                    <Link className={s.link} to='/start'>
                        <div className={s.linkEl}>|</div>
                        <div className={s.linkEl}>|</div>
                    </Link>
                </div>
            </div>
            <div className={!props.classMark ? s.block
            : (props.goodWordsScore > 0  ? `${s.block} ${s.blockGood}` : `${s.block} ${s.blockBad}`)}>    
                <Points goodWordsScore={props.goodWordsScore}/>
                <div className={s.word}>
                    <div className={s.wordOriginal}> {props.wordEnglish} </div>
                    <div className={s.wordTranslate}> {props.gameWordTranslate} </div>
                </div>
                <button className={s.false} onClick={() => { props.checkWord(false) }}>неверно</button>
                <button className={s.true} onClick={() => { props.checkWord(true) }}>верно</button>
                <div> {props.status}</div>
            </div>
        </div>
    )
}
export default GamePlay;
