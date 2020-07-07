import React, { Component } from 'react';
import createArrayWords from '../../logic/createArrayWords';
import shuffle from '../../logic/shuffle';
import Preloader from '../Preloader/Preloader';
import GamePlay from './GamePlay/GamePlay';
import GameFinish from './GameFinish/GameFinish';
import audioGot from '../../files/audio/good.mp3';
import audioError from '../../files/audio/error.mp3';
import audioStart from '../../files/audio/start.mp3';
import audioFinish from '../../files/audio/finish.mp3';
import audioNewLevel from '../../files/audio/newLevel.mp3';
import audioTikTak from '../../files/audio/tikTak.mp3';
import {BrowserRouter as Router, Redirect} from 'react-router-dom';

const intervals = [];
const block = 'block';
const bad = 'bad';
const good = 'good';
class GamePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kv: 0,
            wordCard: {},
            wordCardStatus: false,
        };
    }
    

    stopGame() {
        this.setState({
            kv: 0,
        });
        intervals.forEach(clearInterval);
    }

    playAudio(sound) {
        const audio = new Audio();
        audio.preload = 'auto';
        audio.src = sound;
        audio.play();
        setTimeout(() => audio.pause(), 4000);
    };
    
    wordList() {
        if (this.props.location.aboutProps){
        this.setState({
            uploaded: false
        });
        createArrayWords(this.props.location.aboutProps.level, this.props.location.aboutProps.UserWordList).then((el) => {
            let elSort = [...el]
            elSort.sort((a, b) => {
                const nameA = a.word.length; 
                const nameB = b.word.length;
                if (nameA < nameB) {
                  return -1;
                } if (nameA > nameB) {
                  return 1;
                }
                return 0;
              })
            this.intervalID = setInterval(
                () => this.tick(),
                1000
            );
            intervals.push(this.intervalID);
            this.setState({
                wordList: elSort,
                wordId: 0,
                letterId: 0,
                kv: 64,
                goodWord: [],
                badWord: [],
                score: 0,
                goodWordsScore: 0,
                classMark: block,
                audio: this.props.location.aboutProps.audioStatus,
                word: elSort[0].word.split('').map((el) => ''),
                wordLetters: shuffle(elSort[0].word.split('')),
                lives: 7,
                wordError: 0,
                uploaded: true,
                level: 0,
                success: 0,
            });
            if (this.state.kv === 64) {
                if(this.state.audio){
                    this.playAudio(audioTikTak);
                }
            }
        });  
    }
    };

    componentDidMount() {
        intervals.forEach(clearInterval);
        this.wordList();
    };

    componentWillUnmount() {
        intervals.forEach(clearInterval);
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
        if (this.state.kv === 0 || this.state.wordId === 79 || this.state.lives === 0) {
            if(this.state.audio){
                this.playAudio(audioFinish);
            }
            intervals.forEach(clearInterval);
        }

        this.setState({
            kv: this.toOffsetKv(this.state.kv),
        });
    };

    createWordLetters (arr, level) {
        const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
                         'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
        let newArr = [];
        if ( level > 0){
            for(let i = 0; i < level; i += 1){
                const num  = Math.floor(Math.random() * Math.floor(26));
                newArr[i] = letters[num]
            }
            return shuffle(arr.concat(newArr))
        }
        
        return shuffle(arr)
    }

    checkWord (letter) {
        const id = this.state.wordId;
        if (letter === this.state.wordList[id].word[this.state.letterId]){
            let copyWord = [...this.state.word];
            copyWord[this.state.letterId] = letter;
            let copyWordLetters = [...this.state.wordLetters]
            let i = copyWordLetters.lastIndexOf(letter)
            copyWordLetters.splice(i, 1);
            if(this.state.audio){
                this.playAudio(audioGot);
                if(copyWord.join('') === this.state.wordList[id].word && (id + 1 ) % 6 === 0){
                    this.playAudio(audioNewLevel);
                } else {
                    this.playAudio(audioGot);
                }
            }
            this.setState({
                word: copyWord,
                letterId: this.state.letterId + 1,
                wordLetters: copyWordLetters,
                classMark: good,
                score: this.state.score + 1
            });
            if(copyWord.join('') === this.state.wordList[id].word){
                if (this.state.wordError > 0 ) {
                    this.setState({badWord: this.state.badWord.concat(this.state.wordList[id])}) 
                } else {
                    this.setState({goodWord: this.state.goodWord.concat(this.state.wordList[id])});
                }
                const newId = this.state.level === 0 ? id + 1 : (this.state.success + (this.state.level * 10) + 1)
                const newLevel = (this.state.success + 1 ) % 6 === 0 && this.state.level < 4 ? this.state.level + 1 :  this.state.level;
                this.setState({
                    wordId: newId,
                    success: this.state.success + 1,
                    letterId: 0,
                    word: this.state.wordList[newId].word.split('').map((el) => ''),
                    wordLetters: this.createWordLetters(this.state.wordList[newId].word.split(''), newLevel),
                    wordError: 0,
                    level: newLevel,
                    kv: (this.state.success + 1 ) % 6 === 0 && this.state.level < 4 ? 60 :  this.state.kv,
                    score: this.state.wordError === 0 ? (this.state.score + (10 * (this.state.level + 1))) : ( this.state.score + 5),
                });
            }
            
        } else {
            if(this.state.audio){
                this.playAudio(audioError);
            }
            this.setState({
                lives: this.state.lives - 1,
                wordError: this.state.wordError + 1,
                classMark: bad,
            });
        }

        setTimeout(() => {
          this.setState({
                classMark: block,
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

    changeWordCardStatus(word) {
        this.setState({
            wordCard: word ? word : {},
            wordCardStatus: this.state.wordCardStatus ? false : true,
        });
    }

    render() {
        if (!this.props.location.aboutProps){
            return <Router>
                        <Redirect  to='/constructor/start' />
                    </Router>
        }
        if (this.state.uploaded) {
            if (this.state.kv >= 0 && this.state.wordId < 79 && this.state.lives > 0) {
                return <GamePlay score = {this.state.score} time = {this.state.kv}
                        transcription = {this.state.wordList[this.state.wordId].transcription}
                        wordTranslate = {this.state.wordList[this.state.wordId].wordTranslate}
                        word={this.state.word}
                        wordLetters={this.state.wordLetters}
                        checkWord={(name) => this.checkWord(name)}
                        changeAudio={() => this.changeAudio()}
                        playAudioWord={() => this.playAudioWord()}
                        audioStatus={this.state.audio}
                        lives={this.state.lives}
                        classMark={this.state.classMark}
                        level={this.state.level}
                        success={this.state.success}

                        wordText={this.state.wordList[this.state.wordId].word}
                        stopGame={this.stopGame.bind(this)}/>
            }
            return <GameFinish wordList={() => this.wordList()}
                               goodWord={this.state.goodWord}
                               badWord={this.state.badWord}
                               score={this.state.score}
                               playAudioWord={(e) => this.playAudioWord(e)}
                               changeWordCardStatus={this.changeWordCardStatus.bind(this)}
                               wordCardStatus={this.state.wordCardStatus}
                               wordCard={this.state.wordCard}/>                
        }
        return <Preloader />
    }
}

export default GamePage;
