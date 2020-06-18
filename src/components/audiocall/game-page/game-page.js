import React, { Component } from 'react';
import s from './game-page.module.css';
import Button from '../button/button';

export default class StartPage extends Component {

  render() {
    const { closeGame } = this.props;
    return <div className = {s.page}>
      <Button callback = {closeGame} additionalClassName = 'cancel' name = ''/>
    </div>
  }
}