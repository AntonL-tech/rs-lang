import React from 'react';
import s from './introPage.module.css';
import { Link } from 'react-router-dom';

class StartText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange = (event) => {
        // this.changeState('value', event.target.value);
        this.setState({ value: event.target.value });
    };

    render() {
        return (
            <div className={s.introPage}>
                <h1 className={s.introTitle}>Саванна</h1>
                <h3 className={s.introSubTitle}>Тренировка Саванна развивает словарный запас. Чем больше слов ты знаешь, тем больше очков опыта получишь.</h3>
                <p className={s.introLevelText}>Выбирайте уровень сложности и начинайте игру</p>
                <div className={s.introSelectWrap}>
                    <select className={s.introSelectMenu} value={this.state.value} onChange={this.handleChange}>
                        <option value='levelOne'>Уровень 1</option>
                        <option value='levelTwo'>Уровень 2</option>
                        <option value='levelThree'>Уровень 3</option>
                        <option value='levelFour'>Уровень 4</option>
                        <option value='levelFive'>Уровень 5</option>
                        <option value='levelSix'>Уровень 6</option>
                    </select>
                </div>

                <Link to='/game'>
                    <button className={s.introBtn}> Начать</button>
                </Link>
            </div>
        );
    }
}

export default StartText;

// <button className={s.introBtn} onClick={this.startGame}>
// Начать
// </button>
