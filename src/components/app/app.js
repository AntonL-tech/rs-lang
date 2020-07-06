import React from 'react';
import s from './app.module.css';
import Header from '../app-header/app-header';
import Sidebar from '../app-sidebar/app-sidebar';
import Games from '../app-games/app-games';
import Settings from '../app-settings/app-settings';
import Stats from '../app-stats/app-stats';
import Team from '../app-team/app-team';
import Words from '../app-words/app-words';
import SpeakIt from '../speakit';
import Sprint from '../sprint-game/Sprint';
import Home from '../app-home/app-home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import Auth from '../Auth';
import '../../index.css';
import Savanna from '../savanna/app';
import Audiocall from '../audiocall/audiocall/audiocall';

function App() {
  return (
    <>
      <Router>
        <div className={'block'}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/auth" component={Auth} />
            <ProtectedRoute path="/app-settings" component={Settings} />
            <ProtectedRoute path="/app-games" component={Games} />
            <ProtectedRoute path="/app-words" component={Words} />
            <ProtectedRoute path="/app-stats" component={Stats} />
            <ProtectedRoute path="/app-team" component={Team} />
            <ProtectedRoute path="/speakit" component={SpeakIt} />
            <ProtectedRoute path="/sprint" component={Sprint} />
            <ProtectedRoute path="/savanna" component={Savanna} />
            <ProtectedRoute path="/audiocall" component={Audiocall} />
          </Switch>
        </div>
      </Router>
    </>
  );
}
export default App;
