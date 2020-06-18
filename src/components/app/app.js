import React from 'react';
import s from './app.module.css';
import Auth from '../Auth';
import {
  BrowserRouter,
  Redirect,
  NavLink,
  Route,
  Switch,
} from 'react-router-dom';
import Logout from '../Logout';
import ProtectedRoute from '../ProtectedRoute';
import Game from '../Game';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/game">Game</NavLink>
        <NavLink to="/signin">Login</NavLink>
        <Logout text="Logout" />
        <Switch>
          <Route path="/signin" component={Auth} />
          <ProtectedRoute path="/game" component={Game} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
export default App;
