import React from 'react';
import s from './StartPage.module.css';
import state from '../../logic/state';
import { Link } from 'react-router-dom';

const Sprint = () => {
    state.level = 1;
    const change = ({target: {value}}) => {
        state.level = value;
      }
    return (
        <div className={s.block}>
            <div className={s.name}>
                Sprint Game
            </div>
            <select onChange={change}>
                <option value={1}>Level 1</option>
                <option value={2}>Level 2</option>
                <option value={3}>Level 3</option>
                <option value={4}>Level 4</option>
                <option value={5}>Level 5</option>
                <option value={6}>Level 6</option>
            </select>
            <div className={s.link}>
                <Link to='/game'>Start Game</Link>
            </div>
            <div className={s.link}>
                <Link to='/statistic'>Statistic</Link>
            </div>
        </div>
            
    )
}
export default Sprint;
