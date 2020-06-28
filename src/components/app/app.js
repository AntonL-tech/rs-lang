import React from 'react';
import s from './app.module.css'
import Header from "../app-header/app-header";
import Sidebar from "../app-sidebar/app-sidebar";
import Games from "../app-games/app-games";
import Settings from "../app-settings/app-settings";
import Stats from "../app-stats/app-stats";
import Team from "../app-team/app-team";
import Words from "../app-words/app-words";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Audiocall from '../audiocall/audiocall/audiocall'

function App() {
    return (
        // <>
        //     <Header/>
        //     <Router>
        //         <div className={s.app_content}>
        //             <Sidebar/>
        //             <Switch>
        //                 <Route path='/app-settings'><Settings/></Route>
        //                 <Route path='/app-games'><Games/></Route>
        //                 <Route path='/app-words'><Words/></Route>
        //                 <Route path='/app-stats'><Stats/></Route>
        //                 <Route path='/app-team'><Team/></Route>
        //             </Switch>
        //         </div>
        //     </Router>
        // </>
        <Audiocall />
    );
}
export default App;
