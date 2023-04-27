import React, { useState } from "react";
import axios from "axios";
import "./Contact.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Contact = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:1337/api/newsletters", {
      data:{
        email: email,
      },
      
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className="contact">
      <div className="wrapper">
        <span>Get in touch with us</span>
        <form onSubmit={handleSubmit}>
          <div className="mail">
            <input
              type="email"
              name="email"
              placeholder="Enter your e-mail..."
              value={email}
              onChange={handleEmailChange}
            />
            <button type="submit">JOIN</button>
          </div>
        </form>
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
