import React, { Component } from "react";
import s from './StartPage.module.css';
import { Link } from 'react-router-dom';
import getUserAllWord from '../../api/getUserAllWord';
import Preloader from '../Preloader/Preloader';


const user = 'user'
class StartPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    change (value) {
        this.setState({
            level: value.target.value
        });
    }

    componentDidMount() {
        this.setState({
            uploaded: false
        });
        getUserAllWord(localStorage.userId, localStorage.token).then((el) => {
            const status = el.status;
            if(status === 200){
                el.wordList.then((el) => {
                    this.setState({
                        uploaded: true,
                        UserWordList: [...el],
                        status: status
                    });
                    console.log(this.state.UserWordList)
                })
            } else {
                console.log(status)
                this.setState({
                    uploaded: true,
                    UserWordList: [],
                    status: status,
                });
            }
        })
        
    };

    render() {
        console.log(this.state.UserWordList ? this.state.UserWordList.length : this.state.UserWordList)
        return !this.state.uploaded ? <Preloader />
        : (<div className={s.block}>
                <div className={s.name}>
                    Sprint Game
                </div>
                <div className={s.message}>
                    {this.state.status === 200 && this.state.UserWordList.length < 80 ? 'Вы выучили менее 80 слов' : ''}
                    {this.state.status !== 200 ? 'Вы не авторезированы, статистика не доступна' : ''}
                </div>
                <select className={s.level} onChange={this.change.bind(this)}>
                    {this.state.UserWordList.length > 79 ? <option value={1}>User Level</option> : ''}
                    <option value={1}>Level 1</option>
                    <option value={2}>Level 2</option>
                    <option value={3}>Level 3</option>
                    <option value={4}>Level 4</option>
                    <option value={5}>Level 5</option>
                    <option value={6}>Level 6</option>
                </select>
                    <Link className={s.link} to={
                        {
                            pathname: '/sprint/game',
                            aboutProps: this.state.level
                        }
                    }>Start Game</Link>
                    <Link className={s.link} to='/sprint/statistic'>Statistic</Link>
            </div>
        )
    }
}
export default StartPage;
