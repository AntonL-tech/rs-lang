import React from 'react';
import s from './Team.module.css';

const cards = [
    {
        name: 'Anton Lashyk ',
        job: 'Team lead, main game',
        image: require('./Assets/lashyk.jpg'),
    },
    {
        name: 'Roman Tymchenko',
        job: 'Savanna, about team page',
        image: require('./Assets/avatar.jpg'),
    },
    {
        name: 'Yulia Yertovich',
        job: 'Audiocall, promo page',
        image: require('./Assets/dino.jpg'),
    },
    {
        name: 'Maxim Mirashnichenka',
        job: 'Sprint, word-contructor',
        image: require('./Assets/maxmir.jpg'),
    },
    {
        name: 'Leonid Petrov',
        job: 'Autorization, statistics',
        image: require('./Assets/dino.jpg'),
    },
    {
        name: 'Anton Terekhov',
        job: 'English puzzle',
        image: require('./Assets/antont.jpg'),
    },
];

class Savanna extends React.Component {
    state = {
        isOpen: false,
        startPage: true,
        levelValue: 0,
        isCancel: true,
    };

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
            <div className={s.wrap}>
                <div className={s.mainContainer}>{ourTeamBlocks}</div>
            </div>
        );
    }
}

export default Savanna;
