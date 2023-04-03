import { Button, Space } from 'antd';
import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { removeToken } from '../../helpers';
import './Appheader.scss';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Search from './Search/Search';


import Cart from '../Cart/Cart';
import { useSelector } from 'react-redux';

const AppHeader = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const products = useSelector((state) => state.cart.products);

  const handleLogout = () => {
    removeToken();
    navigate('/', { replace: true });
    window.location.reload();
  };

  return (
    <Space className="header_space">
      <Button className="header_space_brand" href="/" type="link">
        <img
          src={logo}
          alt="Logo"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
          }}
        />
      </Button>
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
      <div className="wrapper">
        <div className="right">
          <div className="search">
            <input
              type="text"
              placeholder="Search a product ..."
              onClick={() => setShowSearch(true)}
            />
            <SearchIcon onClick={() => setShowSearch(true)} />
          </div>
          <div className="icons">
            
            <div className="cartIcon" onClick={() => setOpen(!open)}>
              <ShoppingCartOutlinedIcon />
              <span>{products.length}</span>
            </div>
          </div>
        </div>
        {open && <Cart />}
        {showSearch && <Search setShowSearch={setShowSearch} />}
      </div>
      <Space className="auth_buttons">
        {user ? (
          <>
            <Button className="auth_button_login" href="/profile" type="link">
              {user.username}
            </Button>
            <Button
              className="auth_button_signUp"
              type="primary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button className="auth_button_login" href="/signin" type="link">
              Login
            </Button>
            <Button
              className="auth_button_signUp"
              href="/signup"
              type="primary"
            >
              SignUp
            </Button>
          </>
        )}
      </Space>
    </Space>
  );
};



export default AppHeader;
