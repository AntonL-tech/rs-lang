import React from 'react';
import s from './app-team.module.css'
import Header from '../app-header/app-header'
import Sidebar from '../app-sidebar/app-sidebar'

function Team() {
    return (
            <div>
                <Header/>
                <div className={'flex'}>
                        <Sidebar/>
                        <p>Team</p>
                </div>
            </div>
    )
}
export default Team;
