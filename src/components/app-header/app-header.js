import React from 'react';
import s from './app-header.module.css'

function Header() {
    return (
        <div className={s.header_inner}>
            <div className={s.header_logo}>RSLang</div>
            <div className={s.header_user}>User</div>
            <button className={s.header_button}>Logout</button>
        </div>
    )
}
export default Header;
