import React, { Component } from "react";
import s from './StartPage.module.css';
import { Link } from 'react-router-dom';
import getUserAllWord from '../../api/getUserAllWord';
import Preloader from '../Preloader/Preloader';
import imgAudioOn from '../../files/img/audioOn.png';
import imgAudioOff from '../../files/img/audioOff.png';
import EnglishLevelTest from '../../../english-level-test/EnglishLevelTest';

const user = 'user'
class StartPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    changeAudio() {
        this.setState({
            audioStatus: this.state.audioStatus ? false : true,
        });
    };

    change (value) {
        this.setState({
            level: value.target.value
        });
    }

    componentDidMount() {
        this.setState({
            uploaded: false,
            UserWordList: [1],
            audioStatus: true,
        });
        getUserAllWord(localStorage.userId, localStorage.token).then((el) => {
            const status = el.status;
            if(status === 200){
                el.wordList.then((el) => {
                    this.setState({
                        UserWordList: el,
                        status: status,
                        uploaded: true,
                        level: el.length > 79 ? user : 1,
                    });
                })
                    
            } else {
                this.setState({
                    uploaded: true,
                    UserWordList: [],
                    status: status,
                });
            }
        })
        
    };

    render() {
        return !this.state.uploaded ? <Preloader />
        : (<div className={s.block}>
                <EnglishLevelTest />
                <button className={s.audio} onClick={() => this.changeAudio()}>
                        {this.state.audioStatus ? <img src={imgAudioOn} alt=""/> : <img src={imgAudioOff} alt=""/> }
                </button>
                <div className={s.name}>
                    Word Constructor Game
                </div>
                <div className={s.message}>
                    {this.state.status === 200 && this.state.UserWordList.length < 80 
                    ? `You have learned only ${this.state.UserWordList.length}/80 words. User mode is not available.` : ''}
                    {this.state.status !== 200 ? 'You are not autoresized, user mode and statistics are not available' : ''}
                </div>
                <select className={s.level} onChange={this.change.bind(this)}>
                    {this.state.UserWordList.length > 79 ? <option value={user}>User Level</option> : ''}
                    <option value={1}>Level 1</option>
                    <option value={2}>Level 2</option>
                    <option value={3}>Level 3</option>
                    <option value={4}>Level 4</option>
                    <option value={5}>Level 5</option>
                    <option value={6}>Level 6</option>
                </select>
                    <Link className={s.link} to={
                        {
                            pathname: '/constructor/game',
                            aboutProps: {level: this.state.level,
                                         UserWordList: this.state.UserWordList,
                                         audioStatus: this.state.audioStatus,
                                        }
                        }
                    }>Start Game</Link>
                    
            </div>
        )
    }
}
export default StartPage;
