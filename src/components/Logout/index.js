import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false };
    this.setRedirect = this.setRedirect.bind(this);
  }

  setRedirect() {
    localStorage.removeItem('token');
    this.setState({
      redirect: true,
    });
    this.renderRedirect();
  }

  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to="/auth" />;
    }
  }

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <button onClick={this.setRedirect}>{this.props.text}</button>
      </div>
    );
  }
}

export default Logout;
