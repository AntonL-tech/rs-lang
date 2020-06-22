import React, { Component } from 'react';
import WordTile from './components/WordTile';

class SpeakIt extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <WordTile word="boat" transcription="[bout]" />;
  }
}

export default SpeakIt;
