import React from 'react';
import s from './StatisticPage.module.css';
import { Link } from 'react-router-dom';

const StatisticPage = () => {
    return (
        <div className={s.block}>
             <div className={s.name}>
                StatisticPage
            </div>
            <div className={s.linkBlock}>
                <Link className={s.link} to='/constructor/start'>
                    <div className={s.linkEl}>|</div>
                    <div className={s.linkEl}>|</div>
                </Link>
            </div>
           
        </div>
    )
}
export default StatisticPage;
