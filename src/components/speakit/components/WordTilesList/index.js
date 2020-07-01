import React from 'react';
import WordTile from '../WordTile';
import './wordTilesList.css';
import Spinner from '../Spinner';

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
          guessed={tile.guessed}
        />
      </div>
    );
  });

  return (
    <section className="word-tiles">
      {elements.length ? elements : <Spinner></Spinner>}
    </section>
  );
};

WordTilesList.defaultProps = {
  guessedIds: [],
};

export default WordTilesList;
