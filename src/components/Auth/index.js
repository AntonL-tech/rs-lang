import React, { Component } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { createUser, loginUser } from './clientApi';
import { Redirect } from 'react-router-dom';
import s from './auth.module.css';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      token: '',
      redirect: null,
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
        signin: true,
      });

      Object.keys(this.state).forEach((key) => {
        localStorage.setItem(key, this.state[key]);
      });

      this.setState({ redirect: '/' });
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
    let activeClass = `${s.linksItem} ${s.linksItemActive}`;
    return (
      <div className={s.auth}>
        {this.state.redirect ? <Redirect to={this.state.redirect} /> : null}
        <div className={s.links}>
          <button
            className={this.state.signin ? activeClass : s.linksItem}
            onClick={() => {
              this.setState({ signin: true });
            }}
          >
            Sign In
          </button>
          <button
            className={this.state.signin ? s.linksItem : activeClass}
            onClick={() => {
              this.setState({ signin: false });
            }}
          >
            Sign Up
          </button>
        </div>
        {this.state.signin ? (
          <SignInForm onSubmit={this.onSignIn} />
        ) : (
          <SignUpForm onSubmit={this.onSignUp} />
        )}
      </div>
    );
  }
}

export default Auth;
