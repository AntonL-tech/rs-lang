import React, { Component } from 'react';
import WordTilesList from './components/WordTilesList';

class SpeakIt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { word: 'alcohol', transcription: '[ǽlkəhɔ̀ːl]', id: '1' },
        { word: 'boat', transcription: '[bout]', id: '2' },
        { word: 'agree', transcription: '[əgríː]', id: '3' },
      ],
    };
  }
  render() {
    return <WordTilesList tiles={this.state.data} />;
  }
}

export default SpeakIt;
