import React, { Component } from 'react';
import defaultImg from './engimg.jpg';
import './wordInfo.css';

class WordInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { image, translate, audio } = this.props.word;
    let { isGame, recognizedWord } = this.props;
    return (
      <section className="word" id="word">
        <audio autoPlay src={audio} />
        <img src={image || defaultImg} alt="" className="word__image" />
        <p className="word__translation">{translate}</p>
        {isGame ? (
          <div className="word__transcription">{recognizedWord}</div>
        ) : null}
      </section>
    );
  }
}

export default WordInfo;
