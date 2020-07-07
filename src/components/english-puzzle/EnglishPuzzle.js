  
import React from 'react';
import { BrowserRouter as Router, Route, Switch,Redirect} from 'react-router-dom';

import HomeScreen from "./home-screen/homeScreen";
import StatisticScreen from "./statistic-screen/statistic";
import GameScreen from "./game-screen/gameScreen";


const EnglishPuzzle = () => {
    
    return (
        <Router>
            <Switch>
                <Route exact path='/english-puzzle/start' component={HomeScreen} />
                <Route exact path='/english-puzzle/game' component={GameScreen} />
                <Route exact path='/english-puzzle/statistic' component={StatisticScreen} />
            </Switch>
        </Router>
    );
}


export default EnglishPuzzle;