import React from 'react';

const WordList = (props) => {
  const elements = props.list.map(({ word, transcription, translate, id }) => {
    return (
      <li key={id}>
        <span>{word}</span>
        <span>{transcription}</span>
        <span>{translate}</span>
      </li>
    );
  });
  return <ul>{elements}</ul>;
};

export default WordList;
