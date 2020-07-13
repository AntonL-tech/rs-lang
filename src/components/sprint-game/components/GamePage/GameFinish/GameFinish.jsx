import React from 'react';
import s from './GameFinish.module.css';
import { Link } from 'react-router-dom';
import imgSound from '../../../files/img/sound.png';
import WordCard from './WordCard/WordCard';

const badList = 'badList';
const goodList = 'goodList';

const GameFinish = (props) => {
    const bad = (id) => {
        props.playAudioWord(props.badWord[id].audio);
    }
    const good = (id) => {
        props.playAudioWord(props.goodWord[id].audio)
    }

    const wordCard = (id, list) => {
        const word = list === badList ? props.badWord[id] : props.goodWord[id];
        props.changeWordCardStatus(word);
    }

    return (

        <div className={s.block}>
            <div className={s.result}>Your result: {props.score} points</div>
            {props.wordCardStatus 
                ? <WordCard changeWordCardStatus={props.changeWordCardStatus}
                            wordCard={props.wordCard}
                            playAudioWord={props.playAudioWord}/> 
                : ''}
            <div className={s.statistic}>
                <div className={s.bad}>
                    <div className={s.badName}>
                        Errors: {props.badWord.length}
                    </div>
                    {props.badWord.map((el, i) => {
                        const id = i;
                        return <div id={i} key={el.id} className={s.wordBlock}>
                                    <button className={s.audio} id={i} onClick={() => bad(id)}>
                                        <img src={imgSound} alt=""/>
                                    </button>
                                    <button className={s.word} onClick={() => wordCard(id, badList)} >
                                        {el.word}
                                    </button> 
                                    <span className={s.wordTranslate}> - {el.wordTranslate}</span>
                                </div>
                    })}
                </div>
                <div className={s.line}></div>
                <div className={s.good}>
                    <div className={s.goodName}>
                        I know: {props.goodWord.length}
                    </div>
                    {props.goodWord.map((el, i) => {
                        const id = i;
                        return <div id={i} key={el.id} className={s.wordBlock}>
                                    <button className={s.audio} id={i} onClick={() => good(id)}>
                                        <img src={imgSound} alt=""/>
                                    </button>
                                    <button className={s.word} onClick={() => wordCard(id, goodList)} >
                                        {el.word}
                                    </button> 
                                    <span className={s.wordTranslate}> - {el.wordTranslate}</span>
                                </div>
                    })}
                </div>
            </div>
            <button className={s.link} onClick={() => props.wordList()}>Continue training</button>
            <Link className={s.linkEnd} to='/sprint/start'>Finish training</Link>
        </div>);

}
export default GameFinish;
