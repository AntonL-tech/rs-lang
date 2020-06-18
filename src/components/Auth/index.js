import React, { Component } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { createUser, loginUser } from './clientApi';
import { Route, NavLink } from 'react-router-dom';
import s from './auth.module.css';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      token: '',
    };

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }

  async onSignIn(userData) {
    try {
      const user = await loginUser(userData);
      this.setState({
        userId: user.userId,
        token: user.token,
        email: userData.email,
      });
      this.props.onAuth(this.state);
    } catch (error) {
      console.error(error);
    }
  }

  async onSignUp(userData) {
    try {
      await createUser(userData);
      this.onSignIn(userData);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div className={s.auth}>
        <div className={s.links}>
          <NavLink
            to="/signin"
            className={s.linksItem}
            activeClassName={s.linksItemActive}
          >
            Sign In
          </NavLink>
          <NavLink
            to="/signup"
            className={s.linksItem}
            activeClassName={s.linksItemActive}
          >
            Sign Up
          </NavLink>
        </div>
        <Route path="/signin">
          <SignInForm onSubmit={this.onSignIn} />
        </Route>

        <Route path="/signup">
          <SignUpForm onSubmit={this.onSignUp} />
        </Route>
      </div>
    );
  }
}

export default Auth;
