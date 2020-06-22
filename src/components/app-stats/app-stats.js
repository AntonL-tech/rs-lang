import React from 'react';
import s from './app-stats.module.css'
import Header from '../app-header/app-header'
import Sidebar from '../app-sidebar/app-sidebar'


function Stats() {
    return (
        <div>
            <Header/>
            <div className={'flex'}>
                    <Sidebar/>
                    <p>Statistic</p>
            </div>
        </div>
    )
}
export default Stats;
