import React from 'react';
import a from './app-sidebar.module.css';
import { Link } from 'react-router-dom';

function Sidebar({isOpen, openedPage}) {
  
  console.log(openedPage)
  const sidebarLink = isOpen ? a.sidebar_link : a.hideLinkDescription;
  const sidebarList = isOpen ? a.sidebar_list_open : a.sidebar_list;

  return (
    <div className={a.sidebar_inner}>
      <ul className={`${sidebarList} ${a[openedPage]}`}>
        <li className={a.sidebar_item}>
          <Link to="/">
            <i className="fas fa-home" />
            <span className={sidebarLink}>Home</span>
          </Link>
        </li>
        <li className={a.sidebar_item}>
          <Link to="/app-settings">
            <i className="fas fa-graduation-cap" />
            <span className={sidebarLink}>Main Game</span>
          </Link>
        </li>
        <li className={a.sidebar_item}>
          <Link to="/app-games">
            <i className="fas fa-gamepad fa-5x" />
            <span className={sidebarLink}>games</span>
          </Link>
        </li>
        <li className={a.sidebar_item}>
          <Link to="/app-words">
            <i className="fas fa-book-open" />
            <span className={sidebarLink}>vocabluary</span>
          </Link>
        </li>
        <li className={a.sidebar_item}>
          <Link to="/app-stats">
            <i className="fas fa-chart-pie" />
            <span className={sidebarLink}>statistics</span>
          </Link>
        </li>
        <li className={a.sidebar_item}>
          <Link to="/app-team">
            <i className="fas fa-users fa-5x" />
            <span className={sidebarLink}>Team</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
export default Sidebar;
