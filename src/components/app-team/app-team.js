import React from 'react';
import s from './app-team.module.css'
import Header from '../app-header/app-header'
import Sidebar from '../app-sidebar/app-sidebar'
import Page from '../app-page-structure/app-page-structure';

function Team() {
    return (
            <Page>
                {/* <Header/> */}
                <div className={'flex'}>
                        {/* <Sidebar/> */}
                        <p>Team</p>
                </div>
            </Page>
    )
}
export default Team;
