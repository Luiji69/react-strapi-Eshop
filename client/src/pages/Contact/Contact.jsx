import React from 'react'
import './Contact.scss'

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Contact = () => {
  return (
    <div className="container">
    <span className="big-circle"></span>
    <img src="img/shape.png" className="square" alt="" />
    <div className="form">
      <div className="contact-info">
        <h3 className="title">Let's get in touch</h3>
        <p className="text">
        The Green Box Shop is a green driven marketplace, making accessible<br />
            eco-responsible,<br />Natural and artisanal products ☘️
            <br />
            Shop responsibly!
        </p>

        <div className="info">
          <div className="information">
            <img src="img/location.png" className="icon" alt="" />
            <p>13 Rue Tahar Memmi,<br />Ariana 2091</p>
          </div>
          <div className="information">
            <img src="img/email.png" className="icon" alt="" />
            <p>Email: shop@thegreenboxtn.com</p>
          </div>
          <div className="information">
            <img src="img/phone.png" className="icon" alt="" />
            <p>Phone: +216 90 203 724</p>
          </div>
        </div>

        <div className="social-media">
          <p>Connect with us :</p>
          <div className="social-icons">
            <a href="https://www.facebook.com/thegreenboxtn">
              <FacebookIcon/>
            </a>
            <a href="#">
              <TwitterIcon/>
            </a>
            <a href="https://www.instagram.com/the_green_box_tn/">
              <InstagramIcon/>
            </a>
            <a href="https://www.linkedin.com/company/the-green-box-coworking">
              <LinkedInIcon/>
            </a>
          </div>
        </div>
      </div>

      <div className="contact-form">
        <span className="circle one"></span>
        <span className="circle two"></span>

        <form method='POST' action='https://getform.io/f/5ac35e5e-d7fd-436c-8adf-2bdb48fe08c9'>
          <h3 className="title">Contact us</h3>
          <div className="input-container">
            <input type="text" name="name" className="input" placeholder='Username' />
            
            
          </div>
          <div className="input-container">
            <input type="email" name="email" className="input" placeholder='Email'/>
    
          </div>
          <div className="input-container">
            <input type="tel" name="phone" className="input" placeholder='Phone'/>
           
          </div>
          <div className="input-container textarea">
            <textarea name="message" className="input" placeholder='Message'></textarea>
          </div>
          <input type="submit" value="Send" className="btn" />
        </form>
      </div>
    </div>
  </div>


  )
}

export default Contact