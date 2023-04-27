import React, { useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import Button from '@mui/material/Button';
import { removeToken } from '../../../helpers';
import { Link, useNavigate } from 'react-router-dom';
import './Menu.scss';
import CloseIcon from '@mui/icons-material/Close';
import MenuItem from '@mui/material/MenuItem';
import logo from '../../../assets/logo.png';
import useFetch from '../../hooks/useFetch';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Menu = ({ setShowMenu }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    removeToken();
    navigate('/', { replace: true });
    window.location.reload();
  };
  const { data, loading, error } = useFetch('/categories?populate=*');
  const [expanded, setExpanded] = useState(false); // State to control collapse

  const handleCategoryClick = (id) => {
    navigate(`/products/${id}`);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div className="menu">
      <div className="top">
        <Link to="/" onClick={() => setShowMenu(false)}>
          <img src={logo} alt="Logo" className="navbar__logo" />
        </Link>
        <CloseIcon className="close-btn" onClick={() => setShowMenu(false)} />
      </div>
      <div className="Bottom">
        <a href="/" className="navbar__link">
          Home
        </a>

        <a href="/becomeaseller" className="navbar__link">
          Become a Seller
        </a>
        <a href="/Contact" className="navbar__link">
          Contact
        </a>

        <Box>
          {error && <div>Error fetching categories.</div>}
          {loading && <div>Loading categories...</div>}
          {data && (
            <List
              subheader={
                <ListSubheader component="div">Categories</ListSubheader>
              }
            >
              <Divider />
              {data.slice(0, 5).map((category) => (
                <ListItem key={category.id} onClick={() => setShowMenu(false)}>
                  <ListItemButton
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <ListItemIcon>
                      <NavigateNextIcon />
                    </ListItemIcon>
                    <ListItemText primary={category.attributes.title} />
                  </ListItemButton>
                </ListItem>
              ))}
              {data.length > 5 && ( // Only show collapse if there are more than 5 categories
                <div>
                  <Divider />
                  <ListItemButton onClick={handleExpandClick}>
                    <Typography variant="body1">
                      Show {expanded ? 'less' : 'more'}
                    </Typography>
                    {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </ListItemButton>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {data.slice(5).map((category) => (
                        <ListItem
                          key={category.id}
                          onClick={() => setShowMenu(false)}
                        >
                          <ListItemButton
                            onClick={() => handleCategoryClick(category.id)}
                          >
                            <ListItemIcon>
                              <NavigateNextIcon />
                            </ListItemIcon>
                            <ListItemText primary={category.attributes.title} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </div>
              )}
              <Divider />
            </List>
          )}
        </Box>

        <div className="auth_btn">
          {user ? (
            <>
              <Button
                variant="text"
                className="navbar__button--text"
              >
                {user.username}
                <ExpandMoreIcon/>
              </Button>
              <Link to={'/profile'} onClick={() => setShowMenu(false)}>
                <MenuItem className="menu-item"><NavigateNextIcon />Your profile</MenuItem>
              </Link>
              <Link to={'/userorders'} onClick={() => setShowMenu(false)}>
                <MenuItem className="menu-item"><NavigateNextIcon />Your orders</MenuItem>
              </Link>

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
