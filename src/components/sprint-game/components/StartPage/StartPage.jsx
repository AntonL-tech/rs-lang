import React, { Component } from "react";
import s from './StartPage.module.css';
import { Link } from 'react-router-dom';

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

    render() {
        return (
            <div className={s.block}>
                <div className={s.name}>
                    Sprint Game
                </div>
                <select className={s.level} onChange={this.change.bind(this)}>
                    <option value={1}>Level 1</option>
                    <option value={2}>Level 2</option>
                    <option value={3}>Level 3</option>
                    <option value={4}>Level 4</option>
                    <option value={5}>Level 5</option>
                    <option value={6}>Level 6</option>
                </select>
                    <Link className={s.link} to={
                        {
                            pathname: '/game',
                            aboutProps: this.state.level
                        }
                    }>Start Game</Link>
                    <Link className={s.link} to='/statistic'>Statistic</Link>
            </div>
        )
    }
}
export default StartPage;
