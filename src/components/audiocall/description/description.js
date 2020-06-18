import React, { Component } from 'react';
import s from './description.module.css';

export default class Description extends Component {
  render() {
    return (
      <>
        <h1 className={s.header}>Аудиовызов</h1>
        <p className={s.description}>Тренировка улучшает восприятие английской речи на слух.</p>
      </>
    )
  }
}
