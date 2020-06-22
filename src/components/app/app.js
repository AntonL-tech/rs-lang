import React from 'react';
import s from './app.module.css'
import Header from "../app-header/app-header";
import Sidebar from "../app-sidebar/app-sidebar";
import Games from "../app-games/app-games";
import Settings from "../app-settings/app-settings";
import Stats from "../app-stats/app-stats";
import Team from "../app-team/app-team";
import Words from "../app-words/app-words";
import SpeakIt from '../speakit/speakit'
import Home from '../app-home/app-home'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
    return (
        <>
            <Router>
                <div>
                    <Switch>
                        <Route exact path='/'><Home/></Route>
                        <Route path='/app-settings'><Settings/></Route>
                        <Route path='/app-games'><Games/></Route>
                        <Route path='/app-words'><Words/></Route>
                        <Route path='/app-stats'><Stats/></Route>
                        <Route path='/app-team'><Team/></Route>
                        <Route path='/speakit'><SpeakIt/></Route>
                    </Switch>
                </div>
            </Router>
        </>
    );
}
export default App;
