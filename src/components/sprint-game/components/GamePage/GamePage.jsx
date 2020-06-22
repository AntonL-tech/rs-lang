import React, { Component } from "react";
import s from './GamePage.module.css';
import state from '../../logic/state';
import createArrayWords from '../../logic/createArrayWords';
import { Link } from 'react-router-dom';

class GamePage extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    wordList() {
        this.setState({
            uploaded: false
        });
        createArrayWords().then((el) => {
            this.setState({
                uploaded: true,
                wordList: el,
                wordId: 0,
                kv: 5,
                step: 0,
                goodWord: [],
                badWord: [],
                score: 0,
                goodWordsScore: 0,
            });
            
            console.log(this.state.thisWord, this.state.wordList)
        });
    } 

    componentDidMount() {
        this.wordList();
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    toOffsetKv(offset) {
        
        return offset-1;
    }

    tick() {
        this.setState({
            kv: this.toOffsetKv(this.state.kv)
        });
    }

    checkWord (bool) {
        bool === this.state.wordList[this.state.wordId].wordStatus 
        ? this.true() 
        : this.false();
        this.setState({
            wordId: this.state.wordId + 1,
            step: this.state.step + 1,
        });
    }

    calcNum () {
        let n = this.state.goodWordsScore < 4 ? 10 
        : (this.state.goodWordsScore < 7 ? 20 
        : (this.state.goodWordsScore < 10 ? 40 : 80));

        return n
    }

    true () {
        console.log(true);
        const wordList = [...this.state.goodWord];
        this.setState({
            goodWord: wordList.concat([this.state.wordList[this.state.wordId]]),
            goodWordsScore: this.state.goodWordsScore + 1,
            score: this.state.score + this.calcNum(),
        });
    }

    false () {
        console.log(false);
        this.setState({
            badWord: this.state.badWord.concat([this.state.wordList[this.state.wordId]]),
            goodWordsScore: 0
        });
    }

    render() {
        if (this.state.uploaded) {
            if (this.state.kv >= 0 && this.state.step < 80) {
                return (
                <div className={s.background}>
        
                    <div className={s.name}>
                        Game level {state.level}
                    </div>
                    <div className={s.name}>
                        Score {this.state.score}
                    </div>
                    <div className={s.link}>
                        <Link to='/start'>Clear</Link>
                    </div>
                    <div>{this.state.kv}</div>  
                    <div> {this.state.wordList[this.state.wordId].word} </div>
                    <div> {this.state.wordList[this.state.wordId].gameWordTranslate} </div>
                    <div> {String(this.state.wordList[this.state.wordId].wordStatus) }</div>
                    <button onClick={() => { this.checkWord(true) }}>верно</button>
                    <button onClick={() => { this.checkWord(false) }}>неверно</button>
                </div>  
            )}
            return (
            <div className={s.background}>
                <div className={s.link}>
                    <Link to='/start'>Завершить тренеровку</Link>
                </div>
                <button onClick={() => this.wordList()}>Продолжить тренеровку</button>
                <div>finish</div>
                <button onClick={() => {console.log(this.state.goodWord, this.state.badWord)}}>ride statistics</button>
            </div>);
        }
        
        return (<> loading </>);
    }
    
}
export default GamePage;
