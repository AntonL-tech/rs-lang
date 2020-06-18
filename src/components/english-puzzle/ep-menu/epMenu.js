import React from 'react';
import s from './epMenu.module.css'

const settingButton = s.setting_button;

const megafon = settingButton + ' ' + s.megafon_btn;
const translate = settingButton + ' ' + s.translate_btn;
const song = settingButton + ' ' + s.song_btn;
const image = settingButton + ' ' + s.image_btn;

const chooseButton = settingButton+ ' ' + s.chose_btn;

const EpMenu = () => {
    return (
        <div className={s.menu_wrapper}>
            <div className={s.menu_select_level}> 
                <button className={chooseButton}>Level:</button>
            </div>
            <div className={s.menu_settings}>
            <button className={megafon}></button>
            <button className={translate}></button>
            <button className={song}></button>
            <button className={settingButton}></button>
            <button className={image}></button>
            </div>
        </div>
    )
}


export default EpMenu;