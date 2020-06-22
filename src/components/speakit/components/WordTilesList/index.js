import React from 'react';
import WordTile from '../WordTile';
import './wordTilesList.css';

const WordTilesList = ({ tiles, onSelect }) => {
  const elements = tiles.map((tile) => {
    return (
      <div className="word-tiles__item" key={tile.id}>
        <WordTile
          {...tile}
          onSelect={() => {
            onSelect(tile.id);
          }}
        />
      </div>
    );
  });

  return <section className="word-tiles">{elements}</section>;
};

export default WordTilesList;
