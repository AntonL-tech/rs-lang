import React, { Component } from 'react';

class Recognition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  render() {
    return <div>{this.state.text}</div>;
  }
}

export default Recognition;
