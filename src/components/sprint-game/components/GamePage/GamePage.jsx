import React from 'react';
import s from './GamePage.module.css';
import state from '../../logic/state';
import createArrayWords from '../../logic/createArrayWords';
import Clock from '../clock';
import { Link } from 'react-router-dom';

const GamePage = () => {
    const wordList = createArrayWords().then((el) => {
        console.log(el)
    });
    
    return (
        <div className={s.background}>

            <div className={s.name}>
                Game level {state.level}
            </div>
            <div className={s.link}>
                <Link to='/start'>Clear</Link>
            </div>
            <Clock />
            <button>верно</button>
            <button>неверно</button>
        </div>  
    )
}
export default GamePage;
