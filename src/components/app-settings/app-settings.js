import React from 'react';
import s from './app-settings.module.css'
import Header from '../app-header/app-header'
import Sidebar from '../app-sidebar/app-sidebar'

function Settings() {
    return (
        <div>
            <Header/>
            <div className={'flex'}>
                    <Sidebar/>
                    <p>asdasd</p>
            </div>
        </div>
    )
}
export default Settings;
