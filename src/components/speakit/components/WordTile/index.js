import React, { Component } from 'react';

import './word-tile.css';

class WordTile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { word, transcription, onSelect } = this.props;

    return (
      <div className="word-tile" onClick={onSelect}>
        <p className="word-tile__text">{word}</p>
        <p className="word-tile__transcription">{transcription}</p>
      </div>
    );
  }
}

export default WordTile;
