import React, { useEffect } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Typography,
  Select,
  message,
  Row,
  Spin,
} from 'antd';
import { useAuthContext } from '../../context/AuthContext';
import { API } from '../../constant';
import { useState } from 'react';
import { getToken } from '../../helpers';
import './Profile.scss';
import SignIn from '../../pages/SignIn/SignIn';
import { provinceData, cityData } from '../../regioncity/regioncity'
import axios from 'axios';

const { Title } = Typography;


const Profile = () => {
  const [loading, setLoading] = useState(false);
  const { user, isLoading, setUser } = useAuthContext();

  const [cities, setCities] = useState(cityData[provinceData[0]]);
  const [secondCity, setSecondCity] = useState(cityData[provinceData[0]][0]);

  const handleProvinceChange = (value) => {
    setCities(cityData[value]);
    setSecondCity(cityData[value][0]);
  };

  const onSecondCityChange = (value) => {
    setSecondCity(value);
  };

  const handleProfileUpdate = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`${API}/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // set the auth token to the user's jwt
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      setUser(responseData);
      message.success('Data saved successfully!');
    } catch (error) {
      console.error(Error);
      message.error('Error While Updating the Profile!');
    } finally {
      setLoading(false);
    }
  };
  const [data, setData] = useState(null);

  

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <>
      {user ? (
        <div className="wrapper">
          <Card className="profile_page_card">
            <Row>
              <Title>Edit your profile</Title>
            </Row>
            <Form
              layout="vertical"
              initialValues={{
                username: user?.username,
                email: user?.email,
                Phone: user?.Phone,
                Additional_phone: user?.Additional_phone,
                Adresse: user?.Adresse,
                Region: user?.Region,
                Name: user?.Name,
                City: user?.City,
                last_name: user?.last_name,
              }}
              onFinish={handleProfileUpdate}
            >
              <Row>
                <Col>
                  <Title level={4}>Personal informations</Title>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      {
                        message: 'Username is required!',
                        type: 'string',
                      },
                    ]}
                  >
                    <Input placeholder="Username" disabled />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        message: 'Email is required!',
                        type: 'email',
                      },
                    ]}
                  >
                    <Input placeholder="Email" disabled />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Item
                    label="Name"
                    name="Name"
                    rules={[
                      {
                        required: true,
                        message: 'Name is required!',
                        type: 'string',
                      },
                    ]}
                  >
                    <Input placeholder="Name" />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    label="last name"
                    name="last_name"
                    rules={[
                      {
                        required: true,
                        type: 'string',
                        message: 'Last name is required!',
                      },
                    ]}
                  >
                    <Input placeholder="last_name" rows={6} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Title level={4}>Delivery information</Title>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Item
                    label="Phone number"
                    name="Phone"
                    rules={[
                      {
                        required: true,
                        message: 'Phone number required!',
                        type: 'string',
                      },
                    ]}
                  >
                    <Input placeholder="Phone" maxLength={8} prefix="+216" />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    label="Additional phone"
                    name="Additional_phone"
                    rules={[
                      {
                        type: 'string',
                      },
                    ]}
                  >
                    <Input
                      placeholder="Additional_phone"
                      maxLength={8}
                      prefix="+216"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Item
                    label="Region"
                    name="Region"
                    rules={[
                      {
                        required: true,
                        type: 'string',
                      },
                    ]}
                  >
                    <Select
                      initialvalues={provinceData[0]}
                      onChange={handleProvinceChange}
                      options={provinceData.map((province) => ({
                        label: province,
                        value: province,
                      }))}
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    label="City"
                    name="City"
                    rules={[
                      {
                        required: true,
                        type: 'string',
                      },
                    ]}
                  >
                    <Select
                      value={secondCity}
                      onChange={onSecondCityChange}
                      options={cities.map((city) => ({
                        label: city,
                        value: city,
                      }))}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Item
                    className="adresse"
                    label="Adresse"
                    name="Adresse"
                    rules={[
                      {
                        required: true,
                        message: 'Adresse is required!',
                        type: 'string',
                      },
                    ]}
                  >
                    <Input placeholder="Adresse" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button
                    className="profile_save_btn"
                    htmlType="submit"
                    type="string"
                    size="large"
                  >
                    {loading ? (
                      <>
                        <Spin size="small" /> Saving
                      </>
                    ) : (
                      'Save'
                    )}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
        </div>
      ) : (
        <SignIn />
      )}
    </>
  );
};

export default Profile;
