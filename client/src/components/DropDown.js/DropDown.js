import React, { useState } from 'react';
import './DropDown.scss';
import { brandsDropdown } from '../NavMenu/navItems'; //este sera el prop
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const DropDown = () => {
  const [dropDown, setDropDown] = useState(false);

  const [route,setRoute] = useState('');
  const history = useHistory();

  const clickHandler=()=>{
    if(route){               
      history.push(`${route}`)
    }else{
      history.push('/')
    }
  }

  return (
    <>
      <ul className= {dropDown ? "categorys-submenu clicked" : "categorys-submenu"} onClick={() => setDropDown(!dropDown)}>
        {brandsDropdown.map((item) => {
          return (
            <li key={item.id}>
              <Link to={item.path} className={item.cName} onCLick={()=>setDropDown(!false)}>
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default DropDown;
