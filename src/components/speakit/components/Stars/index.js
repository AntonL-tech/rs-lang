import React from 'react';
import s from './stars.module.css';

const Stars = ({ n }) => {
  let stars = [];
  for (let i = 0; i < n; ++i) {
    stars.push(<div className={s.starsItem} key={i}></div>);
  }

  return <div className={s.stars}>{stars}</div>;
};

export default Stars;
