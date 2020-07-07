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
    console.log('word info props', this.props);

    return (
      <section className="word">
        <img src={image || defaultImg} alt="" className="word__image" />
        {isGame ? (
          <div className="word__transcription">{recognizedWord}</div>
        ) : (
          <>
            <p className="word__translation">{translate}</p>
            <audio autoPlay src={audio} />
          </>
        )}
      </section>
    );
  }
}

export default WordInfo;
