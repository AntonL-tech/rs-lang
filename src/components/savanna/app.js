import React from 'react';
import s from './app.module.css';

import contentImg from './bgImage.svg';

import Modal from './ExitGame/exitGame';
import GamePage from './GamePage/gamePage';
import IntroPage from './IntroPage/introPage';
import closeBtn from './Assets/icons/clear.svg';

const contentStyle = {
    backgroundImage: `url(${contentImg})`,
};

const closeIcon = {
    backgroundImage: `url(${closeBtn})`,
};

class Savanna extends React.Component {
    state = {
        isOpen: false,
        startPage: true,
        levelValue: 0,
    };

    handleChange = (event) => {
        this.setState({ levelValue: event.target.value });
    };

    stopGame = () => {
        console.log('Close done');
        // this.changeState('isOpen', true);
        this.setState({ isOpen: true });
    };

    handleStartGame = () => {
        this.setState({ startPage: false });
    };

    handleSubmit = () => {
        console.log('Submit function!');
        window.location.assign('/start');
        this.setState({ isOpen: false });
    };

    handleCancel = () => {
        console.log('Cancel function!');
        this.setState({ isOpen: false });
    };

    render() {
        console.log('Рендер страницы');
        const { startPage, isOpen, levelValue } = this.state;

        const page = startPage ? (
            <IntroPage levelValue={levelValue} handleChange={this.handleChange} handleStartGame={this.handleStartGame} />
        ) : (
            <GamePage levelValue={levelValue} />
        );
        return (
            <div className={s.gameBg} style={contentStyle}>
                <div className={s.muteIcon}></div>
                <div className={s.exitGameIcon} style={closeIcon} onClick={this.stopGame}></div>
                <Modal isOpen={isOpen} onCancel={this.handleCancel} onSubmit={this.handleSubmit}>
                    {' '}
                </Modal>
                {page}
            </div>
        );
    }

    // <div className={s.gamePage}>
    //     <div> ЭТО СТраница ИГРЫ</div>
    //     <div className={s.questionWordFall}>
    //         <div className={s.questionWord}>{questionWordObj.word}</div>
    //     </div>
    //     <div className={s.answearBlock}>
    //         {questionArray.map((field, i, array) => (
    //             <div key={i.toString() + 5} className={s.answearWordOne} onClick={() => this.answearWord(field, questionWordObj)}>
    //                 {field.wordTranslate}
    //             </div>
    //         ))}
    //     </div>
    // </div>

    // componentDidUpdate() {
    //     console.log(this.state); // весь стартовый массив

    //     let questionArr = this.state.data.slice(this.state.data.length - 4);
    //     // Массив вопросов
    //     let num = Math.floor(Math.random() * questionArr.length); // случайно слово для вопроса

    //     console.log(questionArr[num].word);
    //     let word = questionArr[num].word;
    //     // changeState('questionArray', questionArr);
    //     // this.setState({ questionArray: questionArr });
    //     console.log(word);
    //     // this.setState({ questionWord: word });

    //     // if (!this.rightAnswer) {
    //     //     let rightAnswerSound = new Audio();
    //     //     let wrongAnswerSound = new Audio();
    //     //     // rightAnswerSound.src = correct;
    //     //     // wrongAnswerSound.src = incorrect;
    //     // }
    // }
    // <div className={s.introPage}>
    //     <h1 className={s.introTitle}>Саванна</h1>
    //     <h3 className={s.introSubTitle}>Тренировка Саванна развивает словарный запас. Чем больше слов ты знаешь, тем больше очков опыта получишь.</h3>
    //     <p className={s.introLevelText}>Выбирайте уровень сложности и начинайте игру</p>
    //     <div className={s.introSelectWrap}>
    //         <select className={s.introSelectMenu} value={levelValue} onChange={this.handleChange}>
    //             <option value={0}>Уровень 1</option>
    //             <option value={1}>Уровень 2</option>
    //             <option value={2}>Уровень 3</option>
    //             <option value={3}>Уровень 4</option>
    //             <option value={4}>Уровень 5</option>
    //             <option value={5}>Уровень 6</option>
    //         </select>
    //     </div>

    //     <button className={s.introBtn} onClick={this.handleStartGame}>
    //         {' '}
    //         Начать
    //     </button>
    // </div>
    // <IntroPage levelValue={this.state} handleChange={this.handleChange} handleStartGame={this.handleStartGame} />
    // <IntroPage levelValue={this.state} handleChange={this.handleChange} handleStartGame={this.handleStartGame} />
}

export default Savanna;
