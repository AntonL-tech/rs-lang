import React from 'react';
import a from './app-sidebar.module.css'
import {Link} from "react-router-dom";

function Sidebar() {
    return (
        <div className={a.sidebar_inner}>
            <ul className={a.sidebar_list}>
                <li className={a.sidebar_item}><Link to='/app-settings'><i className="fas fa-cog fa-5x"/></Link></li>
                <li className={a.sidebar_item}><a href="#"><i className="fas fa-gamepad fa-5x"/></a></li>
                <li className={a.sidebar_item}><a href="#"><i className="fas fa-book-dead fa-5x"/></a></li>
                <li className={a.sidebar_item}><a href="#"><i className="fas fa-grin-stars fa-5x"/></a></li>
                <li className={a.sidebar_item}><a href="#"><i className="fas fa-users fa-5x"/></a></li>
            </ul>
        </div>
    )
}
export default Sidebar;
