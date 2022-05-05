import React from 'react';
import './NavMenu.scss';
import { Link } from 'react-router-dom';
import { navItems } from './navItems';

const NavMenu = () => {
  return (
    <>
      <nav className="navBar">
        <ul className="navBar-navItems">
          {navItems.map((item) => {
            return (
              <li key={item.id} className={item.cName}>
                {item.title}
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default NavMenu;
