import React from 'react';
import s from './app.module.css'
import Header from "../app-header/app-header";
import Sidebar from "../app-sidebar/app-sidebar";
import Games from "../app-games/app-games";
import Settings from "../app-settings/app-settings";
import Stats from "../app-stats/app-stats";
import Team from "../app-team/app-team";
import Words from "../app-words/app-words";
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
    return (
        <>
            <Header/>
            <Router>
                <div className={s.app_content}>
                    <Sidebar/>
                    <div>
                        <Route path='./app-settings' compopnent={Settings} />
                        <Route path='./app-games' compopnent={Games} />
                        <Route path='./app-words' compopnent={Words} />
                        <Route path='./app-stats' compopnent={Stats} />
                        <Route path='./app-team' compopnent={Team} />
                    </div>
                </div>
            </Router>
        </>
    );
}
export default App;
