import React from "react";
import "./Contact.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Contact =  () => {

  return (
    <div className="contact">
      <div className="wrapper">
        <span>GET IN TOUCH WITH US:</span>
        <div className="mail">
          <input type="text" name="email" placeholder="Enter your e-mail..." />
          <button>JOIN US</button>
        </div>
        <div className="icons">
        <a href="https://www.facebook.com/thegreenboxtn"> 
          <FacebookIcon />
          </a>
          <a href="https://www.instagram.com/the_green_box_tn/">
          <InstagramIcon />
          </a>
          <a href="https://www.linkedin.com/company/the-green-box-coworking">
          <LinkedInIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;