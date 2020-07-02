import React from 'react';
import s from './app.module.css';

import contentImg from './bgImage.svg';

import GamePage from './GamePage/gamePage';
import IntroPage from './IntroPage/introPage';

const contentStyle = {
    backgroundImage: `url(${contentImg})`,
};

class Savanna extends React.Component {
    state = {
        startPage: true,
        levelValue: 7,
        timer: 3,
        userData: [],
        errorMsg: false,
        errorMsgWordLength: false,
        sound: true,
    };

    getUserWord = async (userId, token) => {
        let arr = [];
        const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words`, {
            method: 'GET',
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        });
        if (rawResponse.status === 200) {
            const content = await rawResponse.json();
            content.forEach((element) => {
                arr.push(element.optional.word);
            });

            this.setState({ userData: arr });
            if (this.state.userData.length < 80) {
                this.setState({ errorMsgWordLength: true });
            } else {
                this.setState({ startPage: false });
            }
        } else {
            this.setState({ errorMsg: true });
        }
    };

    handleStartGame = () => {
        if (this.state.levelValue === 7) {
            console.log(localStorage.userId, localStorage.token);
            this.getUserWord(localStorage.userId, localStorage.token);
        } else {
            this.setState({ startPage: false });
        }
    };

    handleChangeLevel = (event) => {
        this.setState({ levelValue: event.target.value });
        if (event.target.value !== 7) {
            this.setState({ errorMsgWordLength: false });
        }
    };

    handleSound = () => {
        if (this.state.sound) {
            this.setState({ sound: false });
            console.log('WOW');
        } else {
            this.setState({ sound: true });
            console.log('YEHOOO');
        }
    };

    render() {
        const { startPage, levelValue, errorMsg, userData, errorMsgWordLength, sound } = this.state;

        const page = startPage ? (
            <IntroPage
                levelValue={levelValue}
                handleChange={this.handleChangeLevel}
                handleStartGame={this.handleStartGame}
                errorMsg={errorMsg}
                errorMsgWordLength={errorMsgWordLength}
                handleSound={this.handleSound}
                sound={sound}
            />
        ) : (
            <GamePage levelValue={levelValue} handleSound={this.handleSound} sound={sound} timer={this.state.timer} userData={userData} />
        );
        return (
            <div className={s.gameBg} style={contentStyle}>
                {page}
            </div>
        );
    }
}

export default Savanna;
