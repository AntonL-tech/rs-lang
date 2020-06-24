import React from 'react';
import s from './GameFinish.module.css';
import { Link } from 'react-router-dom';

const GameFinish = (props) => {
    return (
        <div className={s.block}>
            <div className={s.result}>Твой результат: {props.score} очков</div>
            <div className={s.statistic}>
                <div className={s.bad}>
                    <div className={s.badName}>
                        Ошибок: {props.badWord.length}
                    </div>
                    {props.badWord.map((el) => {
                        return <div key={el.id} className={s.wordBlock}>
                                    <span className={s.word}>{el.word}</span> - <span className={s.wordTranslate}>{el.wordTranslate}</span>
                                </div>
                    })}
                </div>
                <div className={s.line}></div>
                <div className={s.good}>
                    <div className={s.goodName}>
                        Знаю: {props.goodWord.length}
                    </div>
                    {props.goodWord.map((el) => {
                        return <div key={el.id} className={s.wordBlock}>
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
