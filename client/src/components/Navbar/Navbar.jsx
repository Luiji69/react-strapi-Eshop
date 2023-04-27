import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../assets/logo.png';
import './Navbar.scss';
import Button from '@mui/material/Button';
import { useAuthContext } from '../../context/AuthContext';
import { removeToken } from '../../helpers';
import { Link, useNavigate } from 'react-router-dom';
import Search from './Search/Search';
import { useSelector } from 'react-redux';
import Cart from '../Cart/Cart';
import Menu from './Menu/Menu';
import Dropdown from './Dropdown/Dropdown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Navbar() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [openCart, setOpenCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const products = useSelector((state) => state.cart.products);
  const handleLogout = () => {
    removeToken();
    navigate('/', { replace: true });
    window.location.reload();
  };
  
  return (
    <nav className="navbar">
      <div className="navbar__left">
        <Link to="/">
          <img src={logo} alt="Logo" className="navbar__logo" />
        </Link>
        <div className="navbar__links">
          <a href="/" className="navbar__link">
            Home
          </a>
          <a href="/becomeaseller" className="navbar__link">
            Become a Seller
          </a>
          <a href="/Contact" className="navbar__link">
            Contact
          </a>
        </div>
      </div>
      <div className="navbar__center">
        <div className="navbar__search">
          <SearchIcon
            className="navbar__searchIcon"
            onClick={() => setShowSearch(true)}
          />
          <input
            type="text"
            placeholder="Search a product"
            className="navbar__searchInput"
            onClick={() => setShowSearch(true)}
          />
        </div>
      </div>
      {openCart && <Cart setOpenCart={setOpenCart} />}
      {showSearch && <Search setShowSearch={setShowSearch} />}
      <div className="navbar__right">
        <div className="icons">
          <div className="carticon" onClick={() => setOpenCart(!openCart)}>
            <ShoppingCartOutlinedIcon className="navbar__cartIcon" />
            <span>{products.length}</span>
          </div>
        </div>
        <div className="authbtn">
          {user ? (
            <>
              <Button
                variant="text"
                className="navbar__button--text"
                onClick={() => setShowDropdown(true)}
              >
                {user.username}
                <ExpandMoreIcon/>
              </Button>
              
              <Button
                variant="contained"
                className="navbar__button--contained"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="text"
                className="navbar__button--text"
                href="/signin"
              >
                Login
              </Button>
              <Button
                variant="contained"
                className="navbar__button--contained"
                href="/signup"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
        {showDropdown && <Dropdown setShowDropdown={setShowDropdown} />}

        <MenuIcon
          className="navbar__menuIcon"
          onClick={() => setShowMenu(true)}
        />
        {showMenu && <Menu setShowMenu={setShowMenu} />}
      </div>
    </nav>
  );
}

export default Navbar;
