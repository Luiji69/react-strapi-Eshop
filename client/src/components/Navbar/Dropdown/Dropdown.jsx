import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import './Dropdown.scss';

const Dropdown = ({setShowDropdown}) => {
  return (
    <div className="dd-container">
      <div className="black-layer" onClick={() => setShowDropdown(false)}>
        <div className="dd-menu">
          <Link to={'/profile'}>
            <MenuItem className='menu-item'>Your profile</MenuItem>
          </Link>
          <Link to={'/userorders'}>
            <MenuItem className='menu-item'>Your orders</MenuItem>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
