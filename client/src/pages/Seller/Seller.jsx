import React, { useState } from 'react';
import './Seller.scss';
import useScreenSize from '../../components/hooks/useScreenSize';
import { Button, Card, Col, Form, Input, Row, Spin, Upload } from 'antd';
import axios from 'axios';

const Seller = () => {
  const [formData, setFormData] = useState({
    company_name: '',
    company_email: '',
    owner_phone: '',
    company_address: '',
    owner_name: '',
    owner_lastname: '',
    rne_number: '',
  });
  const handleInputsChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [isLoading, setIsLoading] = useState(false);
  const { isDesktopView } = useScreenSize();
  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    axios
      .post('http://localhost:1337/api/become-sellers', {
        data: {
          company_name: formData.company_name,
          company_email: formData.company_email,
          owner_phone: formData.owner_phone,
          company_address: formData.company_address,
          owner_name: formData.owner_name,
          owner_lastname: formData.owner_lastname,
          rne_number: formData.rne_number,
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
    <div className="seller-container">
      <Row align="middle">
        <Col span={isDesktopView ? 8 : 24} offset={isDesktopView ? 8 : 0}>
          <Card title="Become a seller">
            <Form name="basic" autoComplete="on">
              <Form.Item
                label="Company name:"
                rules={[
                  {
                    required: true,
                    type: 'string',
                  },
                ]}
              >
                <Input
                  placeholder="Company name"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleInputsChange}
                />
              </Form.Item>

              <Form.Item
                label="Company email:"
                rules={[
                  {
                    required: true,
                    type: 'string',
                  },
                ]}
              >
                <Input
                  name="company_email"
                  placeholder="Company email"
                  onChange={handleInputsChange}
                  value={formData.company_email}
                />
              </Form.Item>
              <Form.Item
                label="Company phone:"
                rules={[
                  {
                    required: true,
                    type: 'string',
                  },
                ]}
              >
                <Input
                  name="owner_phone"
                  placeholder="Company phone"
                  prefix="+216"
                  value={formData.company_phone}
                  onChange={handleInputsChange}
                />
              </Form.Item>
              <Form.Item
                label="Company address:"
                rules={[
                  {
                    required: true,
                    type: 'string',
                  },
                ]}
              >
                <Input
                  name="company_address"
                  placeholder="Company address"
                  onChange={handleInputsChange}
                  value={formData.company_address}
                />
              </Form.Item>
              <Form.Item
                label="Owner name:"
                rules={[
                  {
                    required: true,
                    type: 'string',
                  },
                ]}
              >
                <Input
                  placeholder="Owner name"
                  name="owner_name"
                  onChange={handleInputsChange}
                  value={formData.owner_name}
                />
              </Form.Item>
              <Form.Item
                label="Owner last name:"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  name="owner_lastname"
                  placeholder="Owner last name"
                  onChange={handleInputsChange}
                  value={formData.owner_lastname}
                />
              </Form.Item>
              <Form.Item
                label="RNE number:"
                rules={[
                  {
                    required: true,
                    type: 'string',
                  },
                ]}
              >
                <Input
                  name="rne_number"
                  placeholder="RNE number"
                  onChange={handleInputsChange}
                  value={formData.rne_number}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  style={{ background: '#68944f' }}
                  type="primary"
                  htmlType="submit"
                  onClick={onSubmit}
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
