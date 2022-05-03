import React, {useEffect} from 'react';
import { Button } from '@material-ui/core';
import { Menu } from '@material-ui/core';
import {MenuItem} from '@material-ui/core';
import './NavMenu.scss';
import {listBrandProducts} from '../../actions/productActions'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [anchorEl3, setAnchorEl3] = React.useState(null);
  

  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const open3 = Boolean(anchorEl3);

  const dispatch = useDispatch();

  const history = useHistory();

  const productByBrand = useSelector(state => state.productByBrand)
  const {loading, error, products} = productByBrand;

  console.log(loading,error,products);

  useEffect(() =>{
    dispatch(listBrandProducts())
  },[dispatch]);

  const clickHandler = (e) => {
    if (anchorEl) {
      history.push(`/search/${anchorEl}`);
    } else {
      history.push('/');
    }
  };

  console.log(clickHandler);


  return (
    <div className="navMenu-component">
      <Button
        className="navButton"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        Marcas
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={()=>{setAnchorEl(null)}}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={clickHandler}>Adidas</MenuItem>
        <MenuItem onClick={clickHandler}>Puma</MenuItem>
        <MenuItem onClick={clickHandler}>Reebok</MenuItem>
        <MenuItem onClick={clickHandler}>Nike</MenuItem>
        <MenuItem onClick={clickHandler}>Jordan</MenuItem>
      </Menu>


      <Button
        className="navButton"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={(e) => setAnchorEl2(e.currentTarget)}
      >
        Hombre
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl2}
        open={open2}
        onClose={()=>{setAnchorEl2(null)}}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=>{setAnchorEl2(null)}}>Sneakers</MenuItem>
        <MenuItem onClick={()=>{setAnchorEl2(null)}}>Poleras y Casacas</MenuItem>
        <MenuItem onClick={()=>{setAnchorEl2(null)}}>Polos</MenuItem>
        <MenuItem onClick={()=>{setAnchorEl2(null)}}>Shorts</MenuItem>
        <MenuItem onClick={()=>{setAnchorEl2(null)}}>Pants y Joggers</MenuItem>
      </Menu>

      <Button
        className="navButton"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={(e) => setAnchorEl2(e.currentTarget)}
      >
        Mujer
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl2}
        open={open2}
        onClose={()=>{setAnchorEl2(null)}}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=>{setAnchorEl2(null)}}>Sneakers</MenuItem>
        <MenuItem onClick={()=>{setAnchorEl2(null)}}>Poleras y Casacas</MenuItem>
        <MenuItem onClick={()=>{setAnchorEl2(null)}}>Polos</MenuItem>
        <MenuItem onClick={()=>{setAnchorEl2(null)}}>Shorts</MenuItem>
        <MenuItem onClick={()=>{setAnchorEl2(null)}}>Pants y Joggers</MenuItem>
      </Menu>

      <Button
        className="navButton"
        id="basic-button"
        aria-controls={open3 ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open3 ? 'true' : undefined}
        onClick={(e) => setAnchorEl3(e.currentTarget)}
      >
        Accesorios
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl3}
        open={open3}
        onClose={()=>{setAnchorEl3(null)}}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=>{setAnchorEl3(null)}}>Gorras</MenuItem>
        <MenuItem onClick={()=>{setAnchorEl3(null)}}>Lentes</MenuItem>
        <MenuItem onClick={()=>{setAnchorEl3(null)}}>Bolsos</MenuItem>
        <MenuItem onClick={()=>{setAnchorEl3(null)}}>Mochilas</MenuItem>
        <MenuItem onClick={()=>{setAnchorEl3(null)}}>Canguros</MenuItem>
        <MenuItem onClick={()=>{setAnchorEl3(null)}}>Billeteras</MenuItem>
      </Menu>
  
    </div>
  );
};