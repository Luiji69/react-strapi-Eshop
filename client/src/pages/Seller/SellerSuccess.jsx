import React from 'react';
import './SellerSuccess.scss';
import DoneIcon from '@mui/icons-material/Done';
import FavoriteIcon from '@mui/icons-material/Favorite';

const SellerSuccess = () => {
  return (
    <div className="as-container">
      <div className="as-wrapper">
        <div className="as-header">
          <DoneIcon className="done-icon" fontSize="large" />
          <h2>
            Your application to become a seller is successfully submitted!
          </h2>
        </div>
        <div className="as-content">
          <p>
          We will contact you at the earliest opportunity to discuss your application.{' '}
            <FavoriteIcon className="love-icon" fontSize="small" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerSuccess;
