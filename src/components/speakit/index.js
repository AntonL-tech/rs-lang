import React, { Component } from 'react';
import WordTilesList from './components/WordTilesList';
import WordInfo from './components/WordInfo';

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
      selectedWord: {},
    };

    this.selectWord = this.selectWord.bind(this);
  }

  selectWord(id) {
    this.setState(({ data }) => {
      const index = data.findIndex((elem) => elem.id === id);
      return { selectedWord: data[index] };
    });
  }

  render() {
    return (
      <>
        <WordInfo word={this.state.selectedWord} />
        <WordTilesList
          tiles={this.state.data}
          selectId={this.state.selectedWord.id}
          onSelect={this.selectWord}
        />
      </>
    );
  }
}

export default SpeakIt;
