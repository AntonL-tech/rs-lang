import React, { Component } from 'react';

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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
  }

  async onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
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
        <button type="submit">SignIn</button>
      </form>
    );
  }
}

export default SignInForm;
