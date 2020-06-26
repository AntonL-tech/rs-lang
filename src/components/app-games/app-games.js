import React from 'react';
import s from './app-games.module.css'
import {Link} from "react-router-dom";
import Header from '../app-header/app-header';
import Sidebar from '../app-sidebar/app-sidebar';
import SprintImg from '../sprint-game/files/img/sprintPromoBackground.jpg';

function Games() {
    const gameInfo = [
        {image: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg', title: 'SpeakIt', text: 'Описание speakIt', path: '/speakit'},
        {image: SprintImg, title: 'Sprint', text: 'Learn how to quickly translate from English into your native language.', path: '/sprint'},
    ]

    const renderCard = (card, index) => {
        return (
            <div className={s.game_card} key={index}>
                <img style={{ width: '100%', height:'220px' }} className={s.card_img} src={card.image} />
                <div>
                    <div>{card.title}</div>
                    <div>
                        {card.text}
                    </div>
                    <button><Link target='_blank' to={card.path}>Start</Link></button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Header/>
            <div className={'flex'}>
                <Sidebar/>
                <div className={'flex'}>
                    {gameInfo.map(renderCard)}
                </div>
            </div>
        </div>

    )
}
export default Games;
