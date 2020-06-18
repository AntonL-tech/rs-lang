import React, { Component } from 'react';
import StartPage from '../start-page/start-page'
import GamePage from '../game-page/game-page'

export default class Audiocall extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isStartPage: true,
        level: 0,
      }
    }

    closeGame = () => {
      console.log('close');
    }

    changePageState = () => {
      this.setState({isStartPage: false})
    }    
  
    changeLevel = (event) => {
      console.log('here')
      this.setState({level: event.target.value});  
      // this.setState({level: event.target.dataset.level});  
    }
    
    render() {
      console.log(this.state.level);
      if (this.state.isStartPage) {
        return (
          <>
            <StartPage changePageState = {this.changePageState} closeGame = {this.closeGame} changeLevel = {this.changeLevel} /*level = {this.state.level}*//>
          </>
        );
      }
      return <GamePage closeGame = {this.closeGame}/>
      
    }
}
