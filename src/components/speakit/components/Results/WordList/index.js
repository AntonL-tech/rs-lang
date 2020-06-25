import React from 'react';

const WordList = (props) => {
  const onClick = props.onClick;
  const elements = props.list.map(
    ({ word, transcription, translate, id, audio }) => {
      return (
        <li
          key={id}
          onClick={() => {
            onClick(audio);
          }}
        >
          <span>{word}</span>
          <span>{transcription}</span>
          <span>{translate}</span>
        </li>
      );
    }
  );
  return <ul>{elements}</ul>;
};

export default WordList;
