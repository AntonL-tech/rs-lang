import React from 'react';
import s from './introPage.module.css';
import GamePauseModal from '../GamePauseModal/gamePauseModal';
import EnglishLevelTest from '../../english-level-test/EnglishLevelTest';

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
        window.location.assign('/');
    };

    clickToGameReturn = () => {
        this.setState({ isOpen: false });
        window.location.assign('/savanna');
    };

    render() {
        const { isOpen } = this.state;
        const { handleStartGame, handleChange, errorMsg, errorMsgWordLength } = this.props;
        const { levelValue } = this.props;
        const errorMessage = errorMsg ? (
            <p>Please login once more or choose another level</p>
        ) : errorMsgWordLength ? (
            <p>Opps. You have learned less than 80 words. Please choose another level of the game</p>
        ) : (
            <p></p>
        );

        return (
            <>

                <div className={s.introPage}>
  <EnglishLevelTest />
                    <h1 className={s.introTitle}>SAVANNAH</h1>
                    <h3 className={s.introSubTitle}>The Savannah training helps you build your vocabulary. The more words you know, the more experience points you'll get.</h3>
                    <p className={s.introLevelText}>Choose your difficulty level and start the game</p>
                    <div className={s.introSelectWrap}>
                        <select className={s.introSelectMenu} value={levelValue} onChange={handleChange}>
                            <option value={7}>User words</option>
                            <option value={0}>Level 1</option>
                            <option value={1}>Level 2</option>
                            <option value={2}>Level 3</option>
                            <option value={3}>Level 4</option>
                            <option value={4}>Level 5</option>
                            <option value={5}>Level 6</option>
                        </select>
                    </div>
                    <div className={s.errorText}>{errorMessage}</div>
                    <div className={s.introBtn} onClick={handleStartGame}>
                        Start
                    </div>
                </div>
                <GamePauseModal
                    isOpen={isOpen}
                    gamePause={this.stopGame}
                    sound={this.props.sound}
                    gameSound={this.props.handleSound}
                    onGameReturn={this.clickToGameReturn}
                    toMainMenu={this.clickToMainMenuReturn}
                >
                    {' '}
                </GamePauseModal>
            </>
        );
    }
}

export default IntroPage;
