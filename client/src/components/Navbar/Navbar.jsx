import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import Cart from '../Cart/Cart';
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const products = useSelector((state) => state.cart.products);
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="left">
          <div className="item">
            <Link className="link" to="/">
              Home
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/">
              About
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="./Contact">
              Contact
            </Link>
          </div>
        </div>
        <div className="center">
          <Link className="link" to="/">
            <img src="/img/TGBTLOGO.png" alt="" />
          </Link>
        </div>
        <div className="right">
          <div className='search'>
            <input type="text" placeholder='Search a product ...'/>
            <SearchIcon />
          </div>
          <div className="icons">
            <PersonOutlineIcon />
            <FavoriteBorderIcon />
            <div className="cartIcon" onClick={() => setOpen(!open)}>
              <ShoppingCartOutlinedIcon />
              <span>{products.length}</span>
            </div>
          </div>
        </div>
      </div>
      {open && <Cart />}
    </div>
  );
};

export default Navbar;
