import React from 'react';
import s from '../GamePlay.module.css';
import bird from '../../../../files/img/bird.png';
import bird1 from '../../../../files/img/bird1.png';
import bird2 from '../../../../files/img/bird2.png';
import bird3 from '../../../../files/img/bird3.png';
import bird4 from '../../../../files/img/bird4.png';

const GamePlay = (props) => {
const score = props.goodWordsScore % 4;
const text = props.goodWordsScore < 4 ? '' 
            : (props.goodWordsScore < 8 ? '+ 20 points per word'
            : (props.goodWordsScore < 12 ? '+ 40 points per word' 
            : '+ 80 points per word'));
    return props.goodWordsScore < 12 ? (    
        <div>
            <div className={s.point}>
                <div className={score > 0 ? `${s.pointEl} ${s.pointElGood}` : s.pointEl}></div>
                <div className={score > 1 ? `${s.pointEl} ${s.pointElGood}` : s.pointEl}></div>
                <div className={score > 2 ? `${s.pointEl} ${s.pointElGood}` : s.pointEl}></div>    
            </div>
            <div className={s.comboText}>
                {text}
            </div>
            <div className={s.birds}>
                <img className={s.bird1} src={bird1} alt=""/>
                <img className={props.goodWordsScore < 4 ? s.displayNone : s.bird2} src={bird2} alt=""/>
                <img className={props.goodWordsScore < 8 ? s.displayNone : s.bird3} src={bird3} alt=""/>
                <img className={props.goodWordsScore < 12 ? s.displayNone : s.bird4} src={bird4} alt=""/>
                <img className={s.bird} src={bird} alt=""/>
            </div>
        </div>
    ) : (
        <div>
            <div className={s.point}>
                <div className={`${s.pointEl} ${s.pointElGood}`}></div> 
            </div>
            <div className={s.comboText}>
                {text}
            </div>
            <div className={s.birds}>
                <img className={s.bird1} src={bird1} alt=""/>
                <img className={props.goodWordsScore < 4 ? s.displayNone : s.bird2} src={bird2} alt=""/>
                <img className={props.goodWordsScore < 8 ? s.displayNone : s.bird3} src={bird3} alt=""/>
                <img className={props.goodWordsScore < 12 ? s.displayNone : s.bird4} src={bird4} alt=""/>
                <img className={s.bird} src={bird} alt=""/>
            </div>
        </div>
        
    )
}
export default GamePlay;
