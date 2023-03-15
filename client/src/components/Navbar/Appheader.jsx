import { Button, Space } from 'antd';
import React from 'react';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { removeToken } from '../../helpers';
import './Appheader.scss';

const AppHeader = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate('/signin', { replace: true });
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
