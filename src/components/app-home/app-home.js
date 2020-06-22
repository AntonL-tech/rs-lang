import React from 'react';
import s from './app-home.module.css'
import Header from '../app-header/app-header'
import Sidebar from '../app-sidebar/app-sidebar'

function Home() {
    return (
        <div className={s.home_inner}>
            <Header/>
            <div style={{display: 'flex'}}>
                    <Sidebar/>
                    <p>Home</p>
            </div>
        </div>
    )
}
export default Home;