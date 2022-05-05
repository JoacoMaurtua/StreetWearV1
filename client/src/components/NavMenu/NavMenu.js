import React from 'react';
import './NavMenu.scss';
import { Link } from 'react-router-dom';
import { navItems } from './navItems';
import { Button } from '@material-ui/core';


const NavMenu = () => {
  return (
    <>
      <nav className="navBar">
        <ul className="navBar-navItems">
          {navItems.map((item) => {
            return (
              <li key={item.id} className={item.cName}>
                <Link>{item.title}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default NavMenu;
