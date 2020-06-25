import React from 'react';
import s from './Sprint.module.css';
import StartPage from './components/StartPage/StartPage';
import StatisticPage from './components/StatisticPage/StatisticPage';
import GamePage from './components/GamePage/GamePage';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

const Sprint = () => {
    return (
        <Router>
                <div className={s.background}>
                    <Switch>
                        <Route path='/sprint/start' render={() => <StartPage />} />
                        <Route path='/sprint/statistic' component={StatisticPage} />
                        <Route path='/sprint/game' component={GamePage} />
                    </Switch>
                </div>
                <Redirect  to='/sprint/start' />
        </Router>
        
        
    )
}
export default Sprint;
