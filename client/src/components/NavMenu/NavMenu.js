import React,{useState} from 'react';
import './NavMenu.scss';
import { navItems } from './navItems';
import DropDown from '../DropDown.js/DropDown';
import { brandsDropdown } from '../NavMenu/navItems';
import {categorysManDropdown} from '../NavMenu/navItems';
import {categorysWomanDropdown} from '../NavMenu/navItems';
import { accesoriesDropdown } from '../NavMenu/navItems';



const NavMenu = () => {

  const [dropDown,setDropDown] = useState(false);
  const [dropDown2,setDropDown2] = useState(false);
  const [dropDown3,setDropDown3] = useState(false);
  const [dropDown4,setDropDown4] = useState(false);

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
                  {dropDown && <DropDown propDropdown={brandsDropdown}/>}
                </li>
              );
              
            }else if(item.title === 'Hombre'){
              return (
                <li 
                  key={item.id} 
                  className={item.cName}
                  onMouseEnter={() => setDropDown2(true)}
                  onMouseLeave={() => setDropDown2(false)}
                >
                  {item.title}
                  {dropDown2 && <DropDown propDropdown={categorysManDropdown}/>}
                </li>
              );

            }else if(item.title === 'Mujer'){
              return (
                <li 
                  key={item.id} 
                  className={item.cName}
                  onMouseEnter={() => setDropDown3(true)}
                  onMouseLeave={() => setDropDown3(false)}
                >
                  {item.title}
                  {dropDown3 && <DropDown propDropdown={categorysWomanDropdown}/>}
                </li>
              );

            }else if(item.title === 'Accesorios'){
              return (
                <li 
                  key={item.id} 
                  className={item.cName}
                  onMouseEnter={() => setDropDown4(true)}
                  onMouseLeave={() => setDropDown4(false)}
                >
                  {item.title}
                  {dropDown4 && <DropDown propDropdown={accesoriesDropdown}/>}
                </li>
              );

            }else{
              return (
                <li key={item.id} className={item.cName}>
                  {item.title}
                </li>
              );
            }
            
          })}
        </ul>
      </nav>
      
    </>
  );
};

export default NavMenu;
