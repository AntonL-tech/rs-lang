import React from 'react';
import s from './app-games.module.css'
import {Link} from "react-router-dom";
import SprintImg from '../sprint-game/files/img/sprintPromoBackground.jpg';
import Page from '../app-page-structure/app-page-structure'; 
import savannahImg from './assets/savanna.jpg';
import speakItImg from './assets/doyouspeak.jpg';
import puzzleImg from './assets/puzzle.jpg';
import wConstrImg from './assets/wconstr.jpg';
import audioImg from './assets/panda.jpg';

function Games() {
    const gameInfo = [
        {image: speakItImg, title: 'SpeakIt', text: 'Play this mini-game and check your pronunciation.', path: '/speakit'},
        {image: SprintImg, title: 'Sprint', text: 'Learn how to quickly translate from English into your native language.', path: '/sprint'},
        {image: savannahImg, title: 'Savannah', text: 'It helps you build your vocabulary. Guess more words to get the best result.', path: '/savanna'},        
        {image: audioImg, title: 'Audiocall', text: 'Improves your listening skills in English.', path: '/audiocall'},
        {image: wConstrImg, title: 'Word Constructor', text: 'Let\'s find out if you can correctly assemble a word from letters.', path: '/constructor'},
        {image: puzzleImg, title: 'English-puzzle', text: 'Collect sentences from words as if they were puzzles.', path: '/english-puzzle/start'},
    ]

    const renderCard = (card, index) => {
        return (
            <div className={s.game_card} key={index}>
                <img style={{ width: '100%', height:'220px' }} className={s.card_img} src={card.image} alt=''/>
                <div>
                    <div className={s.card_title}>{card.title}</div>
                    <div className={s.card_description}>
                        {card.text}
                    </div>
                    <button className={s.card_button}><Link target='_blank' to={card.path}>Start</Link></button>
                </div>
            </div>
        )
    }

    return (
        <Page openedPage='games'>
            <div className={s.game_page}>
                <div className={s.main_content_wrapper}>
                    <div className={s.cards_container}>
                        {gameInfo.map(renderCard)}
                    </div>
                </div>
            </div>
        </Page>

    )
}
export default Games;
