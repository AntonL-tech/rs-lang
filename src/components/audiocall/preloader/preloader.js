import React from 'react';
import s from './preloader.module.css';
import preloader from '../assets/img/preloader.svg' 

const Preloader = () => {
  return (
    <div className={s.page}>
      <img src={preloader} className={s.preloader} />
    </div>
  )
}

export default Preloader;