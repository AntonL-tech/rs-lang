import React, { Component } from 'react';

class Recognition extends Component {
  constructor(props) {
    super(props);

    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new window.SpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.start();

    this.onRecognitionEnd = this.onRecognitionEnd.bind(this);
    this.onRecognitionResult = this.onRecognitionResult.bind(this);
  }

  componentDidMount() {
    this.recognition.addEventListener('end', this.onRecognitionEnd);
    this.recognition.addEventListener('result', this.onRecognitionResult);
  }

  componentWillUnmount() {
    this.recognition.removeEventListener('end', this.onRecognitionEnd);
    this.recognition.removeEventListener('result', this.onRecognitionResult);
  }

  onRecognitionResult(e) {
    const transcription = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)[0];
    this.props.onRecognition(transcription);
  }

  onRecognitionEnd() {
    this.recognition.start();
  }

  render() {
    return <></>;
  }
}

export default Recognition;
