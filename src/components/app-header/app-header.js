import React from 'react';
import s from './app-header.module.css';
import Logout from '../Logout';

function Header() {
  return (
    <div className={s.header_inner}>
      <div className={s.header_logo}>RSLang</div>
      <div className={s.header_user}>User</div>
      <Logout className={s.header_button} text="Logout" />
    </div>
  );
}
export default Header;
