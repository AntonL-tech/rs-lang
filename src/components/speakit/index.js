import React, { Component } from 'react';
import WordTilesList from './components/WordTilesList';
import WordInfo from './components/WordInfo';
import Recognition from './components/Recognition';

class SpeakIt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          word: 'alcohol',
          transcription: '[ǽlkəhɔ̀ːl]',
          translate: 'Алкоголь',
          id: '1',
          image:
            'https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/files/01_0002.jpg',
          audio:
            'https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/files/01_0002.mp3',
        },
        {
          word: 'boat',
          transcription: '[bout]',
          translate: 'Лодка',
          id: '2',
          image:
            'https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/files/01_0005.jpg',
          audio:
            'https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/files/01_0005.mp3',
        },
        {
          word: 'agree',
          transcription: '[əgríː]',
          translate: 'Согласна',
          id: '3',
          image:
            'https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/files/01_0001.jpg',
          audio:
            'https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/files/01_0001.mp3',
        },
      ],
      guessedWordIds: [],
      selectedWord: {},
      isGame: true,
    };

    this.selectWord = this.selectWord.bind(this);
    this.checkWord = this.checkWord.bind(this);
  }

  selectWord(id) {
    this.setState(({ data }) => {
      const index = data.findIndex((elem) => elem.id === id);
      return { selectedWord: data[index] };
    });
  }

  checkWord(recognizedWord) {
    let words = this.state.data;
    words.forEach(({ word, id }) => {
      if (recognizedWord === word) {
        this.setState(({ guessedWordIds }) => {
          let NewIds = guessedWordIds.includes(id)
            ? guessedWordIds
            : [...guessedWordIds, id];
          return {
            guessedWordIds: NewIds,
          };
        });
      }
    });
  }

  render() {
    return (
      <>
        {this.state.isGame ? (
          <Recognition onRecognition={this.checkWord} />
        ) : null}
        <WordInfo word={this.state.selectedWord} isGame={this.state.isGame} />
        <WordTilesList
          tiles={this.state.data}
          selectId={this.state.selectedWord.id}
          guessedIds={this.state.guessedWordIds}
          onSelect={this.selectWord}
        />
      </>
    );
  }
}

export default SpeakIt;
