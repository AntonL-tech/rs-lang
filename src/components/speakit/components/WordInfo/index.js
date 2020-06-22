import React, { Component } from 'react';
import defaultImg from './engimg.jpg';

class WordInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { image, translate, audio } = this.props.word;
    let isGame = this.props.isGame;

    return (
      <section className="word" id="word">
        <audio autoPlay src={audio} />
        <img src={image || defaultImg} alt="" className="word__image" />
        <p className="word__translation">{translate}</p>
        {isGame ? <div className="word__transcription"></div> : null}
      </section>
    );
  }
}

export default WordInfo;
