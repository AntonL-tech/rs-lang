import React from 'react';
import s from './app-words.module.css'
import Header from '../app-header/app-header'
import Sidebar from '../app-sidebar/app-sidebar'

function Words() {
    return (
        <div>
            <Header/>
            <div className={'flex'}>
                    <Sidebar/>
                    <p>Words</p>
            </div>
        </div>
    )
}
export default Words;
