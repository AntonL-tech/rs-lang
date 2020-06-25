import React from 'react';
import WordList from './WordList';

const Results = (props) => {
  let { errorsWords, knownWords, onReturn, onNewGame } = props;

  return (
    <div>
      <section>
        <div>
          Ошибок<span>{errorsWords.length}</span>
        </div>
        <WordList list={errorsWords} />
      </section>
      <section>
        <div>
          Знаю<span>{knownWords.length}</span>
        </div>
        <WordList list={knownWords} />
      </section>
      <button onClick={onReturn}>Return</button>
      <button onClick={onNewGame}>NewGame</button>
    </div>
  );
};

export default Results;
