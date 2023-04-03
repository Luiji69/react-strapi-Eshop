import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import './Footer.scss';
import logo from '../../assets/logo.png';

function Footer() {
  return (
    <footer>
      <div className="row">
        <div className="column">
          <h3>Categories</h3>
          <ul>
            <li><a href="/products/4">Cosmetics</a></li>
            <li><a href="/products/7">Food</a></li>
            <li><a href="/products/6">Accessories</a></li>
            <li><a href="/products/8">Cleaners</a></li>
            <li><a href="/products/5">Home decoration</a></li>
            <li><a href="/products/9">Other</a></li>
          </ul>
        </div>
        <div className="column">
          <h3>Pages</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="/Contact">Contact Us</a></li>
          </ul>
        </div>
        <div className="column">
          <h3>About</h3>
          <p>The Green Box Shop is a green driven marketplace, making accessible eco-responsible, Natural and artisanal products ☘️ Shop responsibly!</p>
        </div>
        <div className="column">
          <h3>Contact Us</h3>
          <ul>
            <li><LocationOnIcon/> 13 Rue Tahar Memmi, Ariana 2091​</li>
            <li><PhoneAndroidIcon/> Phone: +216 90 203 724​</li>
            <li><EmailIcon/> Email: shop@thegreenboxtn.com​</li>
          </ul>
        </div>
      </div>
      <div className="row">
        <img src={logo} alt="The Green Box Shop Logo" />
        <p className='copy'>© Copyright 2023.
        CREATED BY <a href='https://islembaaziz.netlify.app/'>Islem Baaziz.</a> PREMIUM E-COMMERCE SOLUTIONS.</p>
      </div>
    </footer>
  );
}

export default Footer;
