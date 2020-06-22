import React from 'react';
import s from './app.module.css';
import Header from '../app-header/app-header';
import Sidebar from '../app-sidebar/app-sidebar';
import Games from '../app-games/app-games';
import Settings from '../app-settings/app-settings';
import Stats from '../app-stats/app-stats';
import Team from '../app-team/app-team';
import Words from '../app-words/app-words';
import SpeakIt from '../speakit/speakit';
import Home from '../app-home/app-home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';

function App() {
  return (
    <>
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/auth" component={Auth} />
            <ProtectedRoute path="/app-settings">
              <Settings />
            </ProtectedRoute>
            <ProtectedRoute path="/app-games">
              <Games />
            </ProtectedRoute>
            <ProtectedRoute path="/app-words">
              <Words />
            </ProtectedRoute>
            <ProtectedRoute path="/app-stats">
              <Stats />
            </ProtectedRoute>
            <ProtectedRoute path="/app-team">
              <Team />
            </ProtectedRoute>
            <ProtectedRoute path="/speakit">
              <SpeakIt />
            </ProtectedRoute>
          </Switch>
        </div>
      </Router>
    </>
  );
}
export default App;
