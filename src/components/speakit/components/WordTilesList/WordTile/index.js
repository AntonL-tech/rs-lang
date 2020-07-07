import React, { Component } from 'react';

import './word-tile.css';

class WordTile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { word, transcription, onSelect, selected, guessed } = this.props;

    let className = selected ? 'word-tile word-tile--active' : 'word-tile';
    className = guessed ? `${className} word-tile--guessed` : className;

    return (
      <div className={className} onClick={onSelect}>
        <p className="word-tile__text">{word}</p>
        <p className="word-tile__transcription">{transcription}</p>
      </div>
    );
  }
}

export default WordTile;
