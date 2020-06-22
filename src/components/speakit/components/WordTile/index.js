import React from 'react';

import './word-tile.css';

const WordTile = ({ word, transcription }) => {
  return (
    <div className="word-tile">
      <p className="word-tile__text">{word}</p>
      <p className="word-tile__transcription">{transcription}</p>
    </div>
  );
};

export default WordTile;
