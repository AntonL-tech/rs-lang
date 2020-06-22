import React, { Component } from 'react';
import StartPage from '../start-page/start-page';
import GamePage from '../game-page/game-page';
import GameModel from '../game-model/game-model';
import s from './audiocall.module.css'

export default class Audiocall extends Component {
    constructor(props) {
      super(props);
      this.gameModel = null;
      this.state = {
        isStartPage: true,
        level: 0,
        round: 0,
      }
    }

    closeGame = () => {
      console.log('close');
    }

    changePageState = () => {      
      this.gameModel = new GameModel(this.state.level, this.state.round);
      this.gameModel.init().then((res) => {
        let [currentWord, answers] = res;
        this.setState({currentWord, answers, isStartPage: false})
      })
    }    
  
    changeLevel = (event) => {
      this.setState({level: event.target.value});  
      // this.setState({level: event.target.dataset.level});  
    }
    
    render() {
      let page = <StartPage changePageState = {this.changePageState} changeLevel = {this.changeLevel} /*level = {this.state.level}*//>

      if (!this.state.isStartPage) {
        page = <GamePage currentWord={this.state.currentWord} answers={this.state.answers} gameModel={this.gameModel}/>
      } 

      return (
      <>
        <button className={s.cancel} onClick={this.closeGame} />
        {page}
      </>
      )      
    }
}
