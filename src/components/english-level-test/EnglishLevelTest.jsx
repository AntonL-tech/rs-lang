import React, { Component } from "react";
import s from './EnglishLevelTest.module.css';
import test from './date/englishTest';

const testResult = [1, 2, 3, 2, 0, 1, 3, 1, 3, 2, 
3, 0, 1, 0, 2, 3, 0, 3, 0, 1, 
3, 1, 2, 3, 2, 0, 1, 3, 0, 1];

class EnglishLevelTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            answer: new Array(test.length),
            gameLevel: 1,
        };
    }

    componentDidMount(){
        if (localStorage.gameLevel) {
            this.setState({
                gameLevel: localStorage.gameLevel, 
            })
        }
    }

    changeStatus() {
        this.setState({open: this.state.open ? false : true})
    }

    checkQuestion(question, answer) {
        let newAnswers = [...this.state.answer]
        newAnswers[question] = answer
        this.setState({answer: newAnswers})
    }

    checkTest() {
        let result = 0;
        let gameLevel = 1;
        this.state.answer.forEach((el, i) => {
            result = el === testResult[i] ? result+=1 : result;
        });
        this.changeStatus();
        gameLevel = (Math.ceil(result / this.state.answer.length * 6));
        gameLevel = gameLevel === 0 ? 1 : gameLevel;
            localStorage.setItem('gameLevel', gameLevel);
        console.log(gameLevel);
        this.setState({
            answer: new Array(test.length),
            gameLevel: gameLevel, 
        });
    }

    renderCard = (card, i) => {
        const idQuestion = i;
        return (
            <div className={s.questionBlock} key={i}>
                <div className={s.question}>
                   {i+1} {card.question}
                </div>
                <div className={s.answerBlock}>
                    {card.answer.map((el, i) => {
                        const idAnswer = i;
                        return <div className={this.state.answer[idQuestion] === idAnswer ? s.answerCheck : s.answer} 
                                    key={i} id={i} onClick={() => this.checkQuestion.bind(this)(idQuestion, idAnswer)} >{el}
                                </div>
                    })}
                </div>
            </div>
        )
    }

    render() {
        return <div className={s.block}>
                <div className={s.infoBlock}>
                    <div className={s.startButton} onClick={this.changeStatus.bind(this)}>
                        {!this.state.open ? 'Take an English proficiency test' : 'Close test'}
                    </div>
                    <div className={s.message}>
                        Recommended level {this.state.gameLevel}
                    </div>
                </div>
                
                <div className={this.state.open ? s.testBlock : s.none}>
                        {test.map(this.renderCard)}
                        <div className={s.submit} onClick={this.checkTest.bind(this)}>submit</div>
                </div>
                
            </div>

        }
}
export default EnglishLevelTest;
