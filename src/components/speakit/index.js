import React, { Component } from 'react';
import WordTilesList from './components/WordTilesList';
import WordInfo from './components/WordInfo';
import Recognition from './components/Recognition';
import Stars from './components/Stars';
import Results from './components/Results';
import StartScreen from './components/StartScreen';
import DifficultSelector from './components/DifficultSelector';
import WordService from './wordsService';
class SpeakIt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedWord: {},
      isGame: false,
      recognizedWord: '',
      showResults: false,
      isStart: true,
      difficult: 0,
      hasUserWords: false,
    };

    this.wordService = new WordService();
  }

  componentDidMount() {
    this.wordService.getUserWordsCount().then((userWordsCount) => {
      if (userWordsCount < 10) {
        this.selectDifficult('0');
        this.setState({ hasUserWords: false });
      } else {
        this.selectDifficult('-1');
        this.setState({ hasUserWords: true });
      }
    });
  }

  selectWord = (id) => {
    this.setState(({ data }) => {
      const index = data.findIndex((elem) => elem.id === id);
      return { selectedWord: data[index] };
    });
  };

  checkWord = (recognizedWord) => {
    let words = this.state.data;
    this.setState({ recognizedWord: recognizedWord });
    words.forEach(({ word, id }, index) => {
      if (recognizedWord.toLowerCase() === word.toLowerCase()) {
        this.setState(({ data }) => {
          const guessedWord = data[index];
          guessedWord.guessed = true;
          const before = data.slice(0, index);
          const after = data.slice(index + 1);
          return [...before, guessedWord, ...after];
        });
        this.selectWord(id);
      }
    });
    if (words.length === words.filter((word) => word.guessed).length) {
      this.setState({
        showResults: true,
      });
    }
  };

  startGame = () => {
    this.setState({ isGame: true });
  };

  showResults = () => {
    this.setState({
      isGame: false,
      showResults: true,
      selectedWord: {},
    });
  };

  hideResults = () => {
    this.setState({
      showResults: false,
      selectedWord: {},
    });
  };

  restart = () => {
    let lvl = this.state.difficult;

    this.wordService.getRndWordsFromGroup(lvl).then((data) =>
      this.setState({
        data: data,
        difficult: lvl,
        selectedWord: {},
        isGame: false,
        recognizedWord: '',
        showResults: false,
      })
    );
  };

  hideStartScreen = () => {
    this.setState({ isStart: false });
  };

  selectDifficult = (lvl) => {
    this.setState({ data: [] });
    if (lvl === '-1') {
      this.wordService
        .getRndUserWords()
        .then((data) =>
          this.setState({ data: data, difficult: lvl, selectedWord: {} })
        );
    } else {
      this.wordService
        .getRndWordsFromGroup(lvl)
        .then((data) =>
          this.setState({ data: data, difficult: lvl, selectedWord: {} })
        );
    }
  };

  render() {
    const errorsWordsArr = this.state.data.filter((elem) => !elem.guessed);
    const guessedWordsArr = this.state.data.filter((elem) => elem.guessed);
    const guessedCount = guessedWordsArr.length;

    return (
      <>
        {this.state.isStart ? (
          <StartScreen onClick={this.hideStartScreen} />
        ) : null}
        <DifficultSelector
          onChange={this.selectDifficult}
          hasUserWords={this.state.hasUserWords}
        />
        <Stars n={guessedCount}></Stars>
        {this.state.isGame ? (
          <Recognition onRecognition={this.checkWord} />
        ) : null}
        <WordInfo
          word={this.state.selectedWord}
          isGame={this.state.isGame}
          recognizedWord={this.state.recognizedWord}
        />
        <WordTilesList
          tiles={this.state.data}
          selectId={this.state.isGame ? null : this.state.selectedWord.id}
          onSelect={this.selectWord}
        />
        <button onClick={this.restart}>Restart</button>
        <button onClick={this.startGame}>Start Game!</button>
        <button onClick={this.showResults}>Results</button>
        {this.state.showResults ? (
          <Results
            errorsWords={errorsWordsArr}
            knownWords={guessedWordsArr}
            onReturn={this.hideResults}
            onNewGame={this.restart}
          />
        ) : null}
      </>
    );
  }
}

export default SpeakIt;
