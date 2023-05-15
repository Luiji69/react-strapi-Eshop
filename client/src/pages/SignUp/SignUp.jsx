import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Select,
  Input,
  message,
  Row,
  Spin,
  Typography,
} from 'antd';
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import useScreenSize from '../../components/hooks/useScreenSize';
import { API } from '../../constant';
import { setToken } from '../../helpers';
import './SignUp.scss';
import { provinceData, cityData } from '../../regioncity/regioncity';

const SignUp = () => {
  const { user } = useAuthContext();
  const { isDesktopView } = useScreenSize();
  const navigate = useNavigate();
  const [cities, setCities] = useState(cityData[provinceData[0]]);
  const [secondCity, setSecondCity] = useState(cityData[provinceData[0]][0]);
  const handleProvinceChange = (value) => {
    setCities(cityData[value]);
    setSecondCity(cityData[value][0]);
  };
  const onSecondCityChange = (value) => {
    setSecondCity(value);
  };

  const { setUser } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState('');

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/auth/local/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      } else {
        // set the token
        setToken(data.jwt);

        // set the user
        setUser(data.user);

        message.success(`Welcome to The Green Box ${data.user.username}!`);

        navigate('/profile', { replace: true });
      }
    } catch (error) {
      console.error(error);
      setError(error?.message ?? 'Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {user ? (
        <div>
          <h1>Error</h1>
        </div>
      ) : (
        <Fragment>
          <Row align="middle">
            <Col span={isDesktopView ? 8 : 24} offset={isDesktopView ? 8 : 0}>
              <Card title="SignUp">
                {error ? (
                  <Alert
                    className="alert_error"
                    message={error}
                    type="error"
                    closable
                    afterClose={() => setError('')}
                  />
                ) : null}
                <Form
                  name="basic"
                  layout="vertical"
                  onFinish={onFinish}
                  autoComplete="on"
                >
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        type: 'string',
                      },
                    ]}
                  >
                    <Input placeholder="Username" />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        type: 'email',
                      },
                    ]}
                  >
                    <Input placeholder="Email address" />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true }]}
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>

                  <Form.Item
                    label="Name"
                    name="Name"
                    rules={[
                      {
                        required: true,
                        type: 'string',
                      },
                    ]}
                  >
                    <Input placeholder="Name" />
                  </Form.Item>

                  <Form.Item
                    label="Last name"
                    name="last_name"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Last name" />
                  </Form.Item>

                  <Form.Item
                    label="Phone"
                    name="Phone"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Your phone number" prefix="+216" />
                  </Form.Item>

                  <Form.Item label="Phone" name="Additional_phone">
                    <Input
                      placeholder="Additional phone number"
                      prefix="+216"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Adresse"
                    name="Adresse"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Your adresse" />
                  </Form.Item>

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
                      style={{ width: 420 }}
                      initialvalues={provinceData[0]}
                      onChange={handleProvinceChange}
                      options={provinceData.map((province) => ({
                        label: province,
                        value: province,
                      }))}
                    />
                  </Form.Item>

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
                      style={{ width: 420 }}
                      value={secondCity}
                      onChange={onSecondCityChange}
                      options={cities.map((city) => ({
                        label: city,
                        value: city,
                      }))}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      style={{ background: '#68944f' }}
                      type="primary"
                      htmlType="submit"
                      className="login_submit_btn"
                    >
                      Submit {isLoading && <Spin size="small" />}
                    </Button>
                  </Form.Item>
                </Form>
                <Typography.Paragraph className="form_help_text">
                  Already have an account? <Link to="/signin">Sign In</Link>
                </Typography.Paragraph>
              </Card>
            </Col>
          </Row>
        </Fragment>
      )}
    </>
  );
};

export default SignUp;
