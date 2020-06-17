import React from 'react';
import s from './app-games.module.css'
import {Card, Button} from 'react-bootstrap'

function Games() {

    const gameInfo = [
        {image: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg', title: 'SpeakIt', text: 'Описание speakIt'},
        {image: 'https://avatarko.ru/img/kartinka/14/multfilm_13267.jpg', title: 'English-puzzle', text: 'описание English-puzzle'},
        {image: 'https://avatars.mds.yandex.net/get-pdb/1748902/584d308f-e908-4db5-bf06-fdc7ac756db4/s600', title: 'Саванна', text: 'описание саванна'},
        {image: 'https://cs4.pikabu.ru/post_img/2014/08/17/7/1408269788_753182410.jpg', title: 'Аудиовызов', text: 'описание аудиовызов'},
        {image: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg', title: 'Спринт', text: 'описание спринт'},
        {image: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg', title: 'Своя игра', text: 'описание своя игра'},
    ]

    const renderCard = (card, index) => {
        return (
                <Card className={s.game_card} style={{ width: '33%', height:'380px' }} key = {index}>
                    <Card.Img style={{ width: '100%', height:'220px' }} className={s.card_img} variant="top" src="holder.js/100px180" src={card.image} />
                    <Card.Body>
                        <Card.Title>{card.title}</Card.Title>
                        <Card.Text>
                        {card.text}
                        </Card.Text>
                        <Button variant="primary">Start</Button>
                    </Card.Body>
                </Card>
        )
    }

    return (
        <div className={s.game_inner}>
            {gameInfo.map(renderCard)}
        </div>
    )
}
export default Games;
