import React, { useState } from 'react';
import './Seller.scss';
import { API } from '../../constant';
import { useNavigate } from 'react-router-dom';
import useScreenSize from '../../components/hooks/useScreenSize';
import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Form,
  Select,
  Alert,
  Input,
  Upload,
  Row,
  Spin,
  DatePicker,
} from 'antd';
import { provinceData, cityData } from '../../regioncity/regioncity';

const Seller = () => {
  const [formData, setFormData] = useState({
    owner_name: "",
    company_email: "",
    company_name: "",
    owner_phone: "",
    company_address: "",
    company_region: "",
    company_city: "",
    owner_lastname: "",
    owner_bdd: "",
    owner_identifier: "",
    rne_number: "",

  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isDesktopView } = useScreenSize();
  const [cities, setCities] = useState(cityData[provinceData[0]]);
  const [secondCity, setSecondCity] = useState(cityData[provinceData[0]][0]);
  const handleProvinceChange = (value) => {
    setCities(cityData[value]);
    setSecondCity(cityData[value][0]);
  };
  const onSecondCityChange = (value) => {
    setSecondCity(value);
  };

  const handleSubmit  = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/become-sellers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      
      if (data?.error) {
        throw data?.error;
      } else {
        navigate('/ordersuccess', { state: { data }, replace: true });
      }
    } catch (error) {
      console.error(error);
      setError(error?.message ?? 'Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  return (
    <div className="seller-container">
      <Row align="middle">
        <Col span={isDesktopView ? 8 : 24} offset={isDesktopView ? 8 : 0}>
          <Card title="Become a seller">
          {error ? (
                  <Alert
                    className="alert_error"
                    message={error}
                    type="error"
                    closable
                    afterClose={() => setError('')}
                  />
                ) : null}
            <Form name="basic" onSubmit={handleSubmit} autoComplete="off"
            
            >
              <Form.Item
                label="Company name:"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                rules={[
                  {
                    required: true,
                    type: 'string',
                  },
                ]}
              >
                <Input placeholder="Company name" />
              </Form.Item>

              <Form.Item
                label="Company email:"
                name="company_email"
                value={formData.company_email}
                onChange={handleChange}
                rules={[
                  {
                    required: true,
                    type: 'string',
                  },
                ]}
              >
                <Input placeholder="Company email" />
              </Form.Item>
              <Form.Item
                label="Company phone:"
                name="owner_phone"
                value={formData.owner_phone}
                onChange={handleChange}
                rules={[
                  {
                    required: true,
                    type: 'string',
                  },
                ]}
              >
                <Input placeholder="Company phone" prefix="+216" />
              </Form.Item>
              <Form.Item
                label="Company address:"
                name="company_address"
                value={formData.company_address}
                onChange={handleChange}
                rules={[
                  {
                    required: true,
                    type: 'string',
                  },
                ]}
              >
                <Input placeholder="Company address" />
              </Form.Item>
              <Form.Item
                label="Region"
                name="company_region"
                value={formData.company_region}
                onChange={handleChange}
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

              <Form.Item
                label="City"
                name="company_city"
                value={formData.company_city}
                onChange={handleChange}
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
              <Form.Item
                label="Owner name:"
                name="owner_name"
                value={formData.owner_name}
                onChange={handleChange}
                rules={[
                  {
                    required: true,
                    type: 'string',
                  },
                ]}
              >
                <Input placeholder="Owner name" />
              </Form.Item>
              <Form.Item
                label="Owner last name:"
                name="owner_lastname"
                value={formData.owner_lastname}
                onChange={handleChange}
                rules={[
                  {
                    required: true,
                    type: 'string',
                  },
                ]}
              >
                <Input placeholder="Owner last name" />
              </Form.Item>
              <Form.Item
                label="Owner birth date:"
                name="owner_bdd"
                value={formData.owner_bdd}
                onChange={handleChange}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <DatePicker placeholder="01/01/2001" />
              </Form.Item>
              <Form.Item
                label="Identification type"
                name="owner_identifier"
                value={formData.owner_identifier}
                onChange={handleChange}
                defaultValue="CIN"
                rules={[
                  {
                    required: true,
                    type: 'string',
                  },
                ]}
              >
                <Select
                  defaultValue="CIN"
                  options={[
                    { value: 'CIN', label: 'Cin' },
                    { value: 'Passport', label: 'Passport' },
                  ]}
                />
              </Form.Item>
              
              <Form.Item
                label="RNE number:"
                name="rne_number"
                value={formData.rne_number}
                onChange={handleChange}
                rules={[
                  {
                    required: true,
                    type: 'string',
                  },
                ]}
              >
                <Input placeholder="RNE number" />
              </Form.Item>
             
              <Form.Item>
                <Button
                  style={{ background: '#68944f' }}
                  type="primary"
                  htmlType="submit"
                  onClick={handleSubmit}
                  
                >
                  Submit {isLoading && <Spin size="small" />}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Seller;
