import React, { Component } from 'react';
import WordList from './WordList';

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
      <div>
        {this.state.audio ? <audio autoPlay src={this.state.audio} /> : null}
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
        <button onClick={onReturn}>Return</button>
        <button onClick={onNewGame}>NewGame</button>
      </div>
    );
  }
}

export default Results;
