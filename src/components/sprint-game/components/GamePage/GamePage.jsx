import React, { Component } from "react";
import createArrayWords from '../../logic/createArrayWords';
import Preloader from '../Preloader/Preloader';
import GamePlay from './GamePlay/GamePlay';
import GameFinish from './GameFinish/GameFinish';
import audioGot from '../../files/audio/good.mp3';
import audioError from '../../files/audio/error.mp3';
import audioStart from '../../files/audio/start.mp3';
import audioFinish from '../../files/audio/finish.mp3';


class GamePage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    playAudio(sound) {
            const audio = new Audio();
            audio.preload = 'auto';
            audio.src = sound;
            audio.play();
    };

    wordList() {
        this.setState({
            uploaded: false
        });
        createArrayWords(this.props.location.aboutProps).then((el) => {
            this.intervalID = setInterval(
                () => this.tick(),
                1000
            );
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
                classMark: false,
                audio: true,
            });
        });
    };

    componentDidMount() {
        this.wordList();
    };

    componentWillUnmount() {
        clearInterval(this.intervalID);
    };

    toOffsetKv(offset) {
        return offset-1;
    };

    tick() {
        if (this.state.kv === 61) {
            if(this.state.audio){
                this.playAudio(audioStart);
            }
        }
        if (this.state.kv === 0 || this.state.goodWordsScore === 80) {
            if(this.state.audio){
                this.playAudio(audioFinish);
            }
            clearInterval(this.intervalID);
        }

        this.setState({
            kv: this.toOffsetKv(this.state.kv),
        });
    };

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
        }, 200);
    };

    changeAudio() {
        this.setState({
            audio: this.state.audio ? false : true,
        });
    };

    playAudioWord(audio = this.state.wordList[this.state.wordId].audio){
        this.playAudio(`https://raw.githubusercontent.com/irinainina/rslang-data/master/${audio}`)
    };

    calcNum () {
        let n = this.state.goodWordsScore < 4 ? 10 
        : (this.state.goodWordsScore < 8 ? 20 
        : (this.state.goodWordsScore < 12 ? 40 : 80));
        return n;
    };

    true () {
        if(this.state.audio){
            this.playAudio(audioGot);
        }
        const wordList = [...this.state.goodWord];
        this.setState({
            goodWord: wordList.concat([this.state.wordList[this.state.wordId]]),
            goodWordsScore: this.state.goodWordsScore + 1,
            score: this.state.score + this.calcNum(),
        });
    };

    false () {
        if(this.state.audio){
            this.playAudio(audioError);
        }
        this.setState({
            badWord: this.state.badWord.concat([this.state.wordList[this.state.wordId]]),
            goodWordsScore: 0
        });
    };

    render() {
        if (this.state.uploaded) {
            if (this.state.kv >= 0 && this.state.step < 80) {
                return <GamePlay score = {this.state.score} time = {this.state.kv}
                        wordEnglish = {this.state.wordList[this.state.wordId].word}
                        gameWordTranslate = {this.state.wordList[this.state.wordId].gameWordTranslate}
                        status = {String(this.state.wordList[this.state.wordId].wordStatus)}
                        checkWord={(name) => this.checkWord(name)}
                        changeAudio={() => this.changeAudio()}
                        playAudioWord={() => this.playAudioWord()}
                        audioStatus={this.state.audio}
                        goodWordsScore = {this.state.goodWordsScore}
                        classMark={this.state.classMark}/>
            }
            return <GameFinish wordList={() => this.wordList()}
                               goodWord={this.state.goodWord}
                               badWord={this.state.badWord}
                               score={this.state.score}
                               playAudioWord={(e) => this.playAudioWord(e)}/>
        }
        return <Preloader />
    }
}

export default GamePage;
