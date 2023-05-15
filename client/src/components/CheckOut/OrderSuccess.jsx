import React from 'react';
import './OrderSuccess.scss';
import DoneIcon from '@mui/icons-material/Done';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'

const OrderSuccess = () => {
  const location = useLocation();
  const { data } = location.state || {};
  return (
    <div className="os-container">
      <div className="os-wrapper">
        <div className="os-header">
          <DoneIcon className="done-icon" fontSize="large" />
          <h2>Your order has been successfully submitted!</h2>
        </div>
        <div className="os-content">
          <p>
            Thank you for your purchase <FavoriteIcon className='love-icon' fontSize="small" />
          </p>
          {data && 
            <h4 className=''>Order number {data.data.id}</h4>
          }
            <Link to={`/orderdetail/${data.data.id}-${data.data.attributes.uid}`}>
          <Button className='os-button'>check your order status</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
