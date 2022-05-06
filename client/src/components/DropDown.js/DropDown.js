import React, { useState } from 'react';
import './DropDown.scss';
import { brandsDropdown } from '../NavMenu/navItems'; //este sera el prop
import { Link } from 'react-router-dom';


const DropDown = () => {
  const [dropDown, setDropDown] = useState(false);

  return (
    <>
      <ul className= {dropDown ? "categorys-submenu clicked" : "categorys-submenu"} onClick={() => setDropDown(!dropDown)}>
        {
          brandsDropdown.map((item) => {
            return (
              <li key={item.id} className="left">
                <Link to={item.title?item.path:'/'} className={item.cName} onCLick={()=>setDropDown(!false)}>
                  {item.title}
                </Link>
              </li>
            );
          })
        }
      </ul>
    </>
  );
};

export default DropDown;
