import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import './Footer.scss';

const Footer = () => {
  return (
    <div className="footer">
      <div className="top">
        <div className="item">
          <h1>Categories</h1>
          <span>Men</span>
          <span>Women</span>
          <span>Children</span>
          <span>Accessories</span>
          <span>New Arrivals</span>
        </div>
        <div className="item">
          <h1>Links</h1>
          <span>FAQ</span>
          <span>Pages</span>
          <span>Stores</span>
          <span>Compare</span>
          <span>Cookies</span>
        </div>
        <div className="item">
          <h1>About</h1>
          <span>
            The Green Box Shop is a green driven marketplace, making accessible<br />
            eco-responsible,<br />Natural and artisanal products ☘️
            <br />
            Shop responsibly!
          </span>
        </div>
        <div className="item">
          <h1>Contact</h1>
          <div className="c-item">
            <LocationOnIcon />
            <div className="text">13 Rue Tahar Memmi,<br />Ariana 2091​</div>
          </div>
          <div className="c-item">
            <PhoneAndroidIcon />
            <div className="text">Phone: +216 90 203 724​</div>
          </div>
          <div className="c-item">
            <EmailIcon />
            <div className="text">Email: shop@thegreenboxtn.com​</div>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="left">
          <div className="image-container">
            <img src="/img/logo.png" alt="" />
          </div>
          <span className="copyright">
            © Copyright 2023. CREATED BY Islem Baaziz. PREMIUM E-COMMERCE
            SOLUTIONS.
          </span>
        </div>
        <div className="right">
          <img src="/img/payment.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
