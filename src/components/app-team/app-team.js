import React from 'react';
import s from './Team.module.css';
import Page from '../app-page-structure/app-page-structure';

const cards = [
    {
        name: 'Anton Lashyk ',
        job: 'Team lead, main game',
        image: require('./Assets/lashyk.jpg'),
    },
    {
        name: 'Roman Tymchenko',
        job: 'Savannah, about team page',
        image: require('./Assets/avatar.jpg'),
    },
    {
        name: 'Yulia Reutovich',
        job: 'Audiocall, promo page',
        image: require('./Assets/yulia.jpg'),
    },
    {
        name: 'Maxim Mirashnichenka',
        job: 'Sprint, word-constructor, test',
        image: require('./Assets/maxmir.jpg'),
    },
    {
        name: 'Leonid Petrov',
        job: 'Authorization, speakIt',
        image: require('./Assets/leo.jpg'),
    },
    {
        name: 'Anton Terekhov',
        job: 'English puzzle',
        image: require('./Assets/antont.jpg'),
    },
];

class Team extends React.Component {


    render() {
        const ourTeamBlocks = cards.map((elem, i, array) => (
            <div className={s.teamBlocks}>
                <div className={s.imgBlock}>
                    <img className={s.image} src={elem.image} alt='' />
                </div>

                <div className={s.title}>{elem.name}</div>
                <div className={s.job}>{elem.job}</div>
            </div>
        ));

        return (

            <Page openedPage='team'>
                <div className={'flex'}>
                    <div className={s.wrap}>
                        <div className={s.contentContainer}>
                            <div className={s.mainContainer}>{ourTeamBlocks}</div>
                        </div>
                    </div>
                </div>
            </Page>
        );
    }
}

export default Team;

