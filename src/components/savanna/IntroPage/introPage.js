import React from 'react';
import s from './introPage.module.css';
// import { Link } from 'react-router-dom';

class IntroPage extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }

    // handleChange = (event) => {
    //     value: event.target.value;
    // };

    render() {
        const { handleStartGame, handleChange } = this.props;
        const { levelValue } = this.props;
        console.log(levelValue);
        return (
            <div className={s.introPage}>
                <h1 className={s.introTitle}>Саванна</h1>
                <h3 className={s.introSubTitle}>Тренировка Саванна развивает словарный запас. Чем больше слов ты знаешь, тем больше очков опыта получишь.</h3>
                <p className={s.introLevelText}>Выбирайте уровень сложности и начинайте игру</p>
                <div className={s.introSelectWrap}>
                    <select className={s.introSelectMenu} value={levelValue} onChange={handleChange}>
                        <option value={0}>Уровень 1</option>
                        <option value={1}>Уровень 2</option>
                        <option value={2}>Уровень 3</option>
                        <option value={3}>Уровень 4</option>
                        <option value={4}>Уровень 5</option>
                        <option value={5}>Уровень 6</option>
                    </select>
                </div>

                <button className={s.introBtn} onClick={handleStartGame}>
                    Начать
                </button>
            </div>
        );
    }
}

export default IntroPage;
