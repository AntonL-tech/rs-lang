import React from 'react';
import a from './app-sidebar.module.css';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className={a.sidebar_inner}>
      <ul className={a.sidebar_list}>
        <li className={a.sidebar_item}>
          <Link to="/auth">
            <i className="fas fa-sign-in-alt fa-5x" />
          </Link>
        </li>
        <li className={a.sidebar_item}>
          <Link to="/app-settings">
            <i className="fas fa-cog fa-5x" />
          </Link>
        </li>
        <li className={a.sidebar_item}>
          <Link to="/app-games">
            <i className="fas fa-gamepad fa-5x" />
          </Link>
        </li>
        <li className={a.sidebar_item}>
          <Link to="/app-words">
            <i className="fas fa-book-dead fa-5x" />
          </Link>
        </li>
        <li className={a.sidebar_item}>
          <Link to="/app-stats">
            <i className="fas fa-grin-stars fa-5x" />
          </Link>
        </li>
        <li className={a.sidebar_item}>
          <Link to="/app-team">
            <i className="fas fa-users fa-5x" />
          </Link>
        </li>
        
        <li className={a.sidebar_item}>
          <Link to="/promo">
            <i className="fas fa-users fa-5x" />
          </Link>
        </li>
      </ul>
    </div>
  );
}
export default Sidebar;
