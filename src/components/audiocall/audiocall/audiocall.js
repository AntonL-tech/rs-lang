import React, { Component } from 'react';
import StartPage from '../start-page/start-page';
import GamePage from '../game-page/game-page';
import s from './audiocall.module.css';
import StatisticsPage from '../statistic-page/statistics-page';
import GameModel from '../game-model/game-model';

export default class Audiocall extends Component {
    constructor(props) {
      super(props);
      this.gameModel = new GameModel();
      this.state = {
        isStartPage: true,
        isStatisticsPage: false,
        level: '6',
      }
    }

    startGame = () => {            
      if (!this.state.isStartPage) return;  
      console.log('here') 
      if (!this.state.level === 6) {
        this.gameModel.getUserWords()
          .then((res) => {
            console.log('here2')
            if (res.length < 5) return;
            this.setState({ isStartPage: false })
          })
      } else {
        this.setState({ isStartPage: false })
      }
    } 
    
    showStatistics = (correctAnswers, incorrectAnswers) => {
      this.setState({
        isStatisticsPage: true, 
        correctAnswers,
        incorrectAnswers,
      })
    }
  
    showStartPage = () => {
      this.setState({
        isStatisticsPage: false, 
        isStartPage: true,
      })
    }

    changeLevel = (event) => {
      this.setState({ level: event.target.value });  
    }
   

    render() {
      const { isStartPage, isStatisticsPage, correctAnswers, incorrectAnswers, level } = this.state;

      let page = <StartPage startGame={this.startGame} changeLevel={this.changeLevel} />

      if (!isStartPage) {
        page = <GamePage showStatistics={this.showStatistics} level={level}/>
      } 

      if (isStatisticsPage) {
        page = <StatisticsPage correctAnswers={correctAnswers} incorrectAnswers={incorrectAnswers} showStartPage={this.showStartPage} level= {level}/>
      }

       
    console.log(level);

      return (
      <>
        <button className={s.cancel}/>
        {page}
      </>
      )      
    }
}


const correct = [{
  "word": "agree",
  "image": "files/01_0001.jpg",
  "audio": "files/01_0001.mp3",
  "audioMeaning": "files/01_0001_meaning.mp3",
  "audioExample": "files/01_0001_example.mp3",
  "textMeaning": "To agree is to have the same opinion or belief as another person",
  "textExample": "The students agree they have too much homework",
  "transcription": "[əgríː]",
  "wordTranslate": "согласна",
  "textMeaningTranslate": "Согласиться - значит иметь то же мнение или убеждение, что и другой человек",
  "textExampleTranslate": "Студенты согласны, что у них слишком много домашней работы",
  "id": 1
},
{
  "word": "alcohol",
  "image": "files/01_0002.jpg",
  "audio": "files/01_0002.mp3",
  "audioMeaning": "files/01_0002_meaning.mp3",
  "audioExample": "files/01_0002_example.mp3",
  "textMeaning": "Alcohol is a type of drink that can make people drunk",
  "textExample": "A person should not drive a car after he or she has been drinking alcohol",
  "transcription": "[ǽlkəhɔ̀ːl]",
  "wordTranslate": "алкоголь",
  "textMeaningTranslate": "Алкоголь - это тип напитка, который может сделать людей пьяными",
  "textExampleTranslate": "Человек не должен водить машину после того, как он выпил алкоголь",
  "id": 2
},
{
  "word": "arrive",
  "image": "files/01_0003.jpg",
  "audio": "files/01_0003.mp3",
  "audioMeaning": "files/01_0003_meaning.mp3",
  "audioExample": "files/01_0003_example.mp3",
  "textMeaning": "To arrive is to get somewhere",
  "textExample": "They arrived at school at 7 a.m",
  "transcription": "[əráiv]",
  "wordTranslate": "прибыть",
  "textMeaningTranslate": "Приехать значит попасть куда-то",
  "textExampleTranslate": "Они прибыли в школу в 7 часов утра",
  "id": 3
},]

const incorrect = [{
  "word": "agree",
  "image": "files/01_0001.jpg",
  "audio": "files/01_0001.mp3",
  "audioMeaning": "files/01_0001_meaning.mp3",
  "audioExample": "files/01_0001_example.mp3",
  "textMeaning": "To agree is to have the same opinion or belief as another person",
  "textExample": "The students agree they have too much homework",
  "transcription": "[əgríː]",
  "wordTranslate": "согласна",
  "textMeaningTranslate": "Согласиться - значит иметь то же мнение или убеждение, что и другой человек",
  "textExampleTranslate": "Студенты согласны, что у них слишком много домашней работы",
  "id": 1
},
{
  "word": "alcohol",
  "image": "files/01_0002.jpg",
  "audio": "files/01_0002.mp3",
  "audioMeaning": "files/01_0002_meaning.mp3",
  "audioExample": "files/01_0002_example.mp3",
  "textMeaning": "Alcohol is a type of drink that can make people drunk",
  "textExample": "A person should not drive a car after he or she has been drinking alcohol",
  "transcription": "[ǽlkəhɔ̀ːl]",
  "wordTranslate": "алкоголь",
  "textMeaningTranslate": "Алкоголь - это тип напитка, который может сделать людей пьяными",
  "textExampleTranslate": "Человек не должен водить машину после того, как он выпил алкоголь",
  "id": 2
},
{
  "word": "arrive",
  "image": "files/01_0003.jpg",
  "audio": "files/01_0003.mp3",
  "audioMeaning": "files/01_0003_meaning.mp3",
  "audioExample": "files/01_0003_example.mp3",
  "textMeaning": "To arrive is to get somewhere",
  "textExample": "They arrived at school at 7 a.m",
  "transcription": "[əráiv]",
  "wordTranslate": "прибыть",
  "textMeaningTranslate": "Приехать значит попасть куда-то",
  "textExampleTranslate": "Они прибыли в школу в 7 часов утра",
  "id": 3
},]