import React from 'react';
import s from './StatisticPage.module.css';
import { Link } from 'react-router-dom';

const StatisticPage = () => {
    return (
        <div className={s.background}>

            <div className={s.name}>
                StatisticPage
            </div>
            <div className={s.link}>
            <Link to='/start'>Clear</Link>
            </div>
        </div>
    )
}
export default StatisticPage;
