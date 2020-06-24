import React from 'react';
import s from './Sprint.module.css';
import StartPage from './components/StartPage/StartPage';
import StatisticPage from './components/StatisticPage/StatisticPage';
import GamePage from './components/GamePage/GamePage';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const Sprint = () => {
    return (
        <Router>
            <div className={s.background}>
                <Switch>
                    <Route path='/start' render={() => <StartPage />} />
                    <Route path='/statistic' component={StatisticPage} />
                    <Route path='/game' component={GamePage} />
                </Switch>
                </div>
        </Router>
        
    )
}
export default Sprint;
