import React from 'react';
import s from './WordConstructor.module.css';
import StartPage from './components/StartPage/StartPage';
import StatisticPage from './components/StatisticPage/StatisticPage';
import GamePage from './components/GamePage/GamePage';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

const Sprint = () => {
    return (
        <Router>
                <div className={s.background}>
                    <Switch>
                        <Route path='/constructor/start' render={() => <StartPage />} />
                        <Route path='/constructor/statistic' component={StatisticPage} />
                        <Route path='/constructor/game' component={GamePage} />
                    </Switch>
                </div>
                <Redirect  to='/constructor/start' />
        </Router>
        
        
    )
}
export default Sprint;
