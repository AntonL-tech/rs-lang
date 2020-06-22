import React, { Component } from 'react';

class WordInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { image, translate, audio, transcription } = this.props.word;

    return (
      <section className="word" id="word">
        <audio autoPlay src={audio} />
        <img src={image} alt="" className="word__image" />
        <p className="word__translation">{translate}</p>
        <div className="word__transcription">{transcription}</div>
      </section>
    );
  }
}

export default WordInfo;
