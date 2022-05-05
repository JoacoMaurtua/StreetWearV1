import React,{useState} from 'react';
import './NavMenu.scss';
import { Link } from 'react-router-dom';
import { navItems } from './navItems';
import { Button } from '@material-ui/core';
import DropDown from '../DropDown.js/DropDown';


const NavMenu = () => {
  const [dropDown,setDropDown] = useState(true);
  return (
    <>
      <nav className="navBar">
        <ul className="navBar-navItems">
          {navItems.map((item) => {
            if(item.title === 'Marcas'){
              return (
                <li 
                  key={item.id} 
                  className={item.cName}
                  onMouseEnter={() => setDropDown(true)}
                  onMouseLeave={() => setDropDown(false)}
                >
                  {item.title}
                  {dropDown && <DropDown/>}
                </li>
              );
            }
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
