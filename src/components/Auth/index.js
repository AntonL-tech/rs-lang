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
      failureText: '',
    };

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }

  async onSignIn(userData) {
    const result = await loginUser(userData);
    if (result.status === 'success') {
      let user = result.data;
      this.setState({
        userId: user.userId,
        token: user.token,
        email: userData.email,
        signin: true,
      });
    } else {
      this.setState({ failureText: result.data });
    }

    Object.keys(this.state).forEach((key) => {
      localStorage.setItem(key, this.state[key]);
    });

    this.setState({ redirect: '/' });
  }

  async onSignUp(userData) {
    let result = await createUser(userData);
    if (result.status === 'success') {
      this.onSignIn(userData);
    } else {
      this.setState({ failureText: result.data });
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
        <div className={s.failure}>{this.state.failureText}</div>
      </div>
    );
  }
}

export default Auth;
