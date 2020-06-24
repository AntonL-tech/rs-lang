import React, { Component } from "react";
import createArrayWords from '../../logic/createArrayWords';
import Preloader from '../Preloader/Preloader';
import GamePlay from './GamePlay/GamePlay';
import GameFinish from './GameFinish/GameFinish';

class GamePage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    wordList() {
        this.setState({
            uploaded: false
        });
        createArrayWords(this.props.location.aboutProps).then((el) => {
            this.setState({
                uploaded: true,
                wordList: el,
                wordId: 0,
                kv: 64,
                step: 0,
                goodWord: [],
                badWord: [],
                score: 0,
                goodWordsScore: 0,
                classMark: false
            });
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
            classMark: true,
        });

        setTimeout(() => {
          this.setState({
                classMark: false,
            });
        }, 200)
    }

    calcNum () {
        let n = this.state.goodWordsScore < 4 ? 10 
        : (this.state.goodWordsScore < 8 ? 20 
        : (this.state.goodWordsScore < 12 ? 40 : 80));

        return n
    }

    true () {
        const wordList = [...this.state.goodWord];
        this.setState({
            goodWord: wordList.concat([this.state.wordList[this.state.wordId]]),
            goodWordsScore: this.state.goodWordsScore + 1,
            score: this.state.score + this.calcNum(),
        });
    }

    false () {
        this.setState({
            badWord: this.state.badWord.concat([this.state.wordList[this.state.wordId]]),
            goodWordsScore: 0
        });
    }

    render() {
        if (this.state.uploaded) {
            if (this.state.kv >= 0 && this.state.step < 80) {
                return (
                    <GamePlay score = {this.state.score} time = {this.state.kv}
                        wordEnglish = {this.state.wordList[this.state.wordId].word}
                        gameWordTranslate = {this.state.wordList[this.state.wordId].gameWordTranslate}
                        status = {String(this.state.wordList[this.state.wordId].wordStatus)}
                        checkWord={(name) => this.checkWord(name)}
                        goodWordsScore = {this.state.goodWordsScore}
                        classMark={this.state.classMark}
                    />
            )}
            return <GameFinish wordList={() => this.wordList()}
                               goodWord={this.state.goodWord}
                               badWord={this.state.badWord}
                               score={this.state.score}
                    />
        }
        
        return <Preloader />
    }
    
}
export default GamePage;
