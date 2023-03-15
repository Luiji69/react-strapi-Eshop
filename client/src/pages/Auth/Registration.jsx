import React, { useState } from 'react';
import { Col, Button, FormGroup, Input, Row } from 'reactstrap';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
const initialUser = { email: '', password: '', username: '' };
const Registration = () => {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();
  const handleRegister = async () => {
    const url = 'http://localhost:1337/api/auth/local/register';
    try {
      if(user.username && user.email && user.password) {
        const res = await axios.post(url, user)
        if(res){
          setUser(initialUser);
          navigate('/login');
        }
      }
    } catch (error) {
      toast.error(error.message, {
       hideProgressBar: true, 
      })
    }
  };
  const handleUserChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };
  return (
    <Row>
      <Col>
        <div>
          <h2>Sign up:</h2>
          <FormGroup>
            <Input
              type="text"
              name="username"
              value={user.username}
              onChange={handleUserChange}
              placeholder="Enter your full name"
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="email"
              name="email"
              value={user.email}
              onChange={handleUserChange}
              placeholder="Enter your email"
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              name="password"
              value={user.password}
              onChange={handleUserChange}
              placeholder="Enter a password"
            />
          </FormGroup>
          <Button onClick={handleRegister}>Sign up</Button>
        </div>
      </Col>
    </Row>
  );
};

export default Registration;
