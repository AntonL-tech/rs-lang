import React, { Component } from 'react';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      noConfirmText: '',
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
    if (this.state.password === this.confirmPassword) {
      this.props.onSubmit(this.state);
    } else {
      this.setState({
        noConfirmText: 'Password not match',
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Login"
          onChange={this.onChangeValue}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={this.onChangeValue}
        />
        <input
          type="password"
          name="confirm-password"
          placeholder="Confirm Password"
          onChange={this.onChangeValue}
        />
        <span>{this.state.noConfirmText}</span>
        <button type="submit">SignUp</button>
      </form>
    );
  }
}

export default SignUpForm;
