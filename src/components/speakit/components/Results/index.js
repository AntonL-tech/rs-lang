import React, { Component } from 'react';
import WordList from './WordList';
import s from './Results.module.css';
import sUI from '../../ui-speakit.module.css';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: '',
    };
    this.playSound = this.playSound.bind(this);
  }

  playSound(audio) {
    this.setState({
      audio: audio,
    });
  }

  render() {
    let { errorsWords, knownWords, onReturn, onNewGame } = this.props;

    return (
      <div className={s.resultsWrapper}>
        {this.state.audio ? <audio autoPlay src={this.state.audio} /> : null}
        <div className={s.resultsContainer}>
          <section>
            <div>
              Ошибок<span>{errorsWords.length}</span>
            </div>
            <WordList list={errorsWords} onClick={this.playSound} />
          </section>
          <section>
            <div>
              Знаю<span>{knownWords.length}</span>
            </div>
            <WordList list={knownWords} onClick={this.playSound} />
          </section>
          <button className={sUI.button} onClick={onReturn}>
            Return
          </button>
          <button className={sUI.button} onClick={onNewGame}>
            NewGame
          </button>
        </div>
      </div>
    );
  }
}

export default Results;
