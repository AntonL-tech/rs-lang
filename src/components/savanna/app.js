import React from 'react';
import s from './app.module.css';

import contentImg from './bgImage.svg';

import GamePage from './GamePage/gamePage';
import IntroPage from './IntroPage/introPage';
// import closeBtn from './Assets/icons/clear.svg';

const contentStyle = {
    backgroundImage: `url(${contentImg})`,
};

// const closeIcon = {
//     backgroundImage: `url(${closeBtn})`,
// };

class Savanna extends React.Component {
    state = {
        // isOpen: false,
        startPage: true,
        levelValue: 0,
        timer: 3,
    };

    handleStartGame = () => {
        this.setState({ startPage: false });
    };

    handleChangeLevel = (event) => {
        this.setState({ levelValue: event.target.value });
    };

    render() {
        console.log('Рендер страницы');
        const { startPage, levelValue } = this.state;

        const page = startPage ? (
            <IntroPage levelValue={levelValue} handleChange={this.handleChangeLevel} handleStartGame={this.handleStartGame} />
        ) : (
            <GamePage levelValue={levelValue} timer={this.state.timer} />
        );
        return (
            <div className={s.gameBg} style={contentStyle}>
                {page}
            </div>
        );
    }
}

export default Savanna;
