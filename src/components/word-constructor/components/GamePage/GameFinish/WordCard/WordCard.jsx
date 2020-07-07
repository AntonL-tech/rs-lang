import React from 'react';
import s from './WordCard.module.css';
import imgSound from '../../../../files/img/sound.png';

const WordCard = (props) => {
    const delTeg = (str, tg) => {
        return str.split(`<${tg}>`).join(' ').split(`</${tg}>`).join(' ')
    }
    return (
        <div className={s.wordCard}>
            <div className={s.container}>
                <div className={s.imgBlock}>
                    <img className={s.img} src={`https://raw.githubusercontent.com/irinainina/rslang-data/master/${props.wordCard.image}`} alt=""/>
                </div>
                <button className={s.audio} onClick={() => props.playAudioWord(props.wordCard.audio)}>
                                        <img src={imgSound} alt={props.wordCard.word}/>
                                        {props.wordCard.word}
                                    </button>
                <div className={s.transcription}>{props.wordCard.transcription}</div>
                <div className={s.wordTranslate}>{props.wordCard.wordTranslate}</div>
                <div className={s.textExample}>{delTeg(props.wordCard.textExample, 'b')}</div>
                <div className={s.textExampleTranslate}>{props.wordCard.textExampleTranslate}</div>
                <div className={s.textMeaning}>{delTeg(props.wordCard.textMeaning, 'i')}</div>
                <div className={s.textMeaningTranslate}>{props.wordCard.textMeaningTranslate}</div>
                <button className={s.link} onClick={props.changeWordCardStatus}>
                    <div className={s.container}>
                        <div className={s.linkEl}>|</div>
                        <div className={s.linkEl}>|</div>
                    </div>
                </button>
            </div>
        </div>
    );

}
export default WordCard;
