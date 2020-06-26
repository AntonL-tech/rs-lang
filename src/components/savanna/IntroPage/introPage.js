import React from 'react';
import s from './introPage.module.css';
import GamePauseModal from '../GamePauseModal/gamePauseModal';

class IntroPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false };
    }

    stopGame = () => {
        this.setState({ isOpen: true });
    };

    clickToMainMenuReturn = () => {
        this.setState({ isOpen: false });
        window.location.assign('/start');
    };

    clickToGameReturn = () => {
        this.setState({ isOpen: false });
    };

    render() {
        const { isOpen } = this.state;
        const { handleStartGame, handleChange } = this.props;
        const { levelValue } = this.props;
        return (
            <>
                <div className={s.introPage}>
                    <h1 className={s.introTitle}>SAVANNAH</h1>
                    <h3 className={s.introSubTitle}>The Savannah training helps you build your vocabulary. The more words you know, the more experience points you'll get.</h3>
                    <p className={s.introLevelText}>Choose your difficulty level and start the game</p>
                    <div className={s.introSelectWrap}>
                        <select className={s.introSelectMenu} value={levelValue} onChange={handleChange}>
                            <option value={0}>Level 1</option>
                            <option value={1}>Level 2</option>
                            <option value={2}>Level 3</option>
                            <option value={3}>Level 4</option>
                            <option value={4}>Level 5</option>
                            <option value={5}>Level 6</option>
                        </select>
                    </div>
                    <button className={s.introBtn} onClick={handleStartGame}>
                        Start
                    </button>
                </div>
                <GamePauseModal isOpen={isOpen} gamePause={this.stopGame} onGameReturn={this.clickToGameReturn} toMainMenu={this.clickToMainMenuReturn}>
                    {' '}
                </GamePauseModal>
            </>
        );
    }
}

export default IntroPage;
