import React from 'react';
import s from './app-stats.module.css'
// import Header from '../app-header/app-header'
// import Sidebar from '../app-sidebar/app-sidebar'
import Page from '../app-page-structure/app-page-structure';


function Stats() {
    return (
        <Page openedPage='stats'>
            <div className={'flex'}>
                    <p>Statistic</p>
            </div>
        </Page>
    )
}
export default Stats;
