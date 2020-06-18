import React from 'react';
import s from './app.module.css';

import StartPage from './StartScreen/startScreen';
import Modal from './ExitGame/exitGame';
import GamePage from './GamePage/gamePage';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import contentImg from './bgImage.svg';
import closeBtn from './Assets/icons/clear.svg';

class Savanna extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false };

        // this.stopGame = this.stopGame.bind(this);
    }

    stopGame = () => {
        console.log('Close done');
        this.setState({ isOpen: true });
    };

    handleSubmit = () => {
        console.log('Submit function!');
        window.location.assign('/start');
        this.setState({ isOpen: false });
    };

    handleCancel = () => {
        console.log('Cancel function!');
        this.setState({ isOpen: false });
    };

    render() {
        return (
            <div className={s.gameBg} style={contentStyle}>
                <div className={s.muteIcon}></div>
                <div className={s.exitGameIcon} style={closeIcon} onClick={this.stopGame}></div>

                <Modal isOpen={this.state.isOpen} onCancel={this.handleCancel} onSubmit={this.handleSubmit}>
                    {' '}
                </Modal>

                <Router>
                    <Switch>
                        <Route exact path='/start' component={StartPage} />
                        <Route path='/game' component={GamePage} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

const contentStyle = {
    backgroundImage: `url(${contentImg})`,
};

const closeIcon = {
    backgroundImage: `url(${closeBtn})`,
};

export default Savanna;

// <Route exact path='/game' component={GamePage} />
//                         <Route exact path='/statistic' component={StatisticPage} />
