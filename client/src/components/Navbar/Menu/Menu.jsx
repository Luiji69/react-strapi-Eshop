import React from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import Button from '@mui/material/Button';
import { removeToken } from '../../../helpers';
import { Link,useNavigate } from 'react-router-dom';
import './Menu.scss';
import { MdClose } from 'react-icons/md';
import logo from '../../../assets/logo.png';

const Menu = ({ setShowMenu }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    removeToken();
    navigate('/', { replace: true });
    window.location.reload();
  };
  return (
    <div className="menu">
      <div className="top">
      <Link to="/" onClick={() => setShowMenu(false)}>
          <img src={logo} alt="Logo" className="navbar__logo" />
        </Link>
      <MdClose className="close-btn" onClick={() => setShowMenu(false)} />
      </div>
      <div className="Bottom">
        <a href="/" className="navbar__link">
          Home
        </a>
        
        <a href="/" className="navbar__link">
          About
        </a>
        <a href="/Contact" className="navbar__link">
          Contact
        </a>
        <div className="auth_btn">
          {user ? (
            <>
              <Button
                variant="text"
                className="navbar__button--text"
                href="/profile"
              >
                {user.username}
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
      </div>
    </div>
  );
};

export default Menu;
