import React, { Component } from 'react';
import s from './button.module.css';

export default class Button extends Component {
  render() {
    const { additionalClassName, callback, name } = this.props;
    
    return <button 
      className={s[additionalClassName]}
      onClick={callback}
    >{name}</button>
  }
}