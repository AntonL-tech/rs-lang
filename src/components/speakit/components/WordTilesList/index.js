import React from 'react';
import WordTile from '../WordTile';
import './wordTilesList.css';

const WordTilesList = ({ tiles, onSelect, selectId }) => {
  const elements = tiles.map((tile) => {
    return (
      <div className="word-tiles__item" key={tile.id}>
        <WordTile
          {...tile}
          onSelect={() => {
            onSelect(tile.id);
          }}
          selected={tile.id === selectId}
        />
      </div>
    );
  });

  return <section className="word-tiles">{elements}</section>;
};

export default WordTilesList;
