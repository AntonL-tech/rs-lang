import React from 'react';
import s from './app-games.module.css'
import {Card, Button} from 'react-bootstrap'
import {Link} from "react-router-dom";
import Header from '../app-header/app-header'
import Sidebar from '../app-sidebar/app-sidebar'

function Games() {
    return (
        <div>
            <Header/>
            <div style={{display: 'flex'}}>
                <Sidebar/>
                <div style={{display: 'flex'}}>
                    <Card className={s.game_card} style={{ width: '350px', height:'380px' }}>
                        <Card.Img style={{ width: '100%', height:'220px' }} className={s.card_img} variant="top" src={'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg'} />
                        <Card.Body>
                            <Card.Title>SpeakIt</Card.Title>
                            <Card.Text>
                            Описание SpeakIt
                            </Card.Text>
                            <Button variant="primary"><Link target='_blank' to='/speakit'>Start</Link></Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
        
    )
}
export default Games;
