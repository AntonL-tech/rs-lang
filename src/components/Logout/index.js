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
      <>
        {this.renderRedirect()}
        <button onClick={this.setRedirect} className={this.props.className}>
          {this.props.text}
        </button>
      </>
    );
  }
}

export default Logout;
