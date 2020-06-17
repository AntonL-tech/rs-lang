import React from 'react';
import s from './GamePage.module.css';
import state from '../../logic/state';
import { Link } from 'react-router-dom';

const GamePage = () => {
    return (
        <div className={s.background}>

            <div className={s.name}>
                Game level {state.level}
            </div>
            <div className={s.link}>
                <Link to='/start'>Clear</Link>
            </div>
        </div>
        
    )
}
export default GamePage;
