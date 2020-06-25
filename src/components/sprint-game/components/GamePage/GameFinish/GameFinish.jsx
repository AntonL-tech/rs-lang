import React from 'react';
import s from './GameFinish.module.css';
import { Link } from 'react-router-dom';
import imgSound from '../../../files/img/sound.png';

const GameFinish = (props) => {
    const bad = (id) => {
        props.playAudioWord(props.badWord[id].audio);
    }
    const good = (id) => {
        props.playAudioWord(props.goodWord[id].audio)
    }
    return (
        <div className={s.block}>
            <div className={s.result}>Твой результат: {props.score} очков</div>
            <div className={s.statistic}>
                <div className={s.bad}>
                    <div className={s.badName}>
                        Ошибок: {props.badWord.length}
                    </div>
                    {props.badWord.map((el, i) => {
                        const id = i;
                        return <div id={i} key={el.id} className={s.wordBlock}>
                                    <button className={s.audio} id={i} onClick={() => bad(id)}>
                                        <img src={imgSound} alt=""/>
                                    </button>
                                    <span className={s.word}>{el.word}</span> - <span className={s.wordTranslate}>{el.wordTranslate}</span>
                                </div>
                    })}
                </div>
                <div className={s.line}></div>
                <div className={s.good}>
                    <div className={s.goodName}>
                        Знаю: {props.goodWord.length}
                    </div>
                    {props.goodWord.map((el, i) => {
                        const id = i;
                        return <div id={i} key={el.id} className={s.wordBlock}>
                                    <button className={s.audio} id={i} onClick={() => good(id)}>
                                        <img src={imgSound} alt=""/>
                                    </button>
                                    <span className={s.word}>{el.word}</span>  - <span className={s.wordTranslate}>{el.wordTranslate}</span>
                                </div>
                    })}
                </div>
            </div>
            <button onClick={() => props.wordList()}>Продолжить тренеровку</button>
            <Link className={s.link} to='/start'>Завершить тренеровку</Link>
        </div>);

}
export default GameFinish;
