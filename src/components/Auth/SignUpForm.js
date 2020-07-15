import React, { Component } from 'react';
import s from './auth.module.css';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      errorText: '',
    };

    this.onChangeValue = this.onChangeValue.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeValue(e) {
    if (e.target.name === 'username') {
      this.setState({ email: e.target.value });
    }
    if (e.target.name === 'password') {
      this.setState({ password: e.target.value });
    }
    if (e.target.name === 'confirm-password') {
      this.setState({ confirmPassword: e.target.value });
    }
  }

  async onSubmit(e) {
    e.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        errorText: 'Password not match',
      });
      return;
    }
    this.props.onSubmit(this.state);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className={s.auth_form}>
        <label>Login: </label>
        <input
          type="text"
          name="username"
          placeholder="Login"
          onChange={this.onChangeValue}
        />
        <label>Password: </label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={this.onChangeValue}
        />
        <label>Confirm password: </label>
        <input
          type="password"
          name="confirm-password"
          placeholder="Confirm Password"
          onChange={this.onChangeValue}
        />
        <span>{this.state.errorText}</span>
        <p className={s.passwordInfo}>
          The password must contain at least 8 characters, at least one
          uppercase letter, one uppercase letter, one number and one special
          character from + -_ @ $!% *? & #.,;: [] {}
        </p>
        <button type="submit" className={s.button}>
          SignUp
        </button>
      </form>
    );
  }
}

export default SignUpForm;
