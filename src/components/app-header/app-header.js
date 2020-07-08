import React from 'react';
import Logout from '../Logout';
import s from './app-header.module.css'
import Burger from './header-burger/header-burger'

const user = window.localStorage.getItem('email');

function Header() {
  return (
    <div className={s.header_inner}>
      <Burger/>
      <div className={s.header_logo}>RSLang</div>
      <div className={s.header_content}>
        <div className={s.header_user}>{user}</div>
        <Logout className={s.header_button} text="Logout" />
      </div>
    </div>
  );
}
export default Header;
