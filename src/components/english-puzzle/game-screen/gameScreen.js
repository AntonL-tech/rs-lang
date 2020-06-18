import React from 'react';
import s from './gameScreen.module.css'

import EpHeader from "../ep-header/epHeader";
import EpMenu from "../ep-menu/epMenu";
import EpGame from "../ep-game/epGame";

const GameScreen = () => {
    return (
        <div>
             <div className={s.background}>
            </div>
            <div className={s.mainBase}> 
                <EpHeader/>
                <EpMenu/>
                <EpGame/>
            </div>
        </div>
    )
}


export default GameScreen;