  
import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import HomeScreen from "./home-screen/homeScreen";
import StatisticScreen from "./statistic-screen/statistic";
import GameScreen from "./game-screen/gameScreen";


const App = () => {
    
    return (
        <Router>
            <Switch>
                <Route exact path='/start' component={HomeScreen} />
                <Route exact path='/game' component={GameScreen} />
                <Route exact path='/statistic' component={StatisticScreen} />
            </Switch>
        </Router>
    );
}


export default App;