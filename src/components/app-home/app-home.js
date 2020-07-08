import React from 'react';
import s from './app-home.module.css'
import Header from '../app-header/app-header'
import Sidebar from '../app-sidebar/app-sidebar'
import Promo from '../promo/promo'

function Home() {
    return (
        <div>
            <Header/>
            <div  className={'flex'}>
                    <Sidebar/>
                    <p>Home</p>
            </div>
        </div>
    )
}
export default Home;
