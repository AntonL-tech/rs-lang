import React from 'react';
import loading from '../../files/img/loading.svg'
import s from './Preloader.module.css';

const Preloader = () => {
    return <div className={s.preloader}>
        <img src={loading} alt="Preloader"/>
    </div>
}
export default Preloader