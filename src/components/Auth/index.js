import React, { Component } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { createUser, loginUser } from './clientApi';

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
      this.setState({ userId: user.userId, token: user.token });
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
      <div>
        <SignInForm onSubmit={this.onSignIn} />
        <SignUpForm onSubmit={this.onSignUp} />
      </div>
    );
  }
}

export default Auth;
