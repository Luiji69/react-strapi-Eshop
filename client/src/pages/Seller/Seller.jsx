import React, { useState } from 'react';
import { Button, Card, Col, Form, Input, Row, Spin, Upload,Alert } from 'antd';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import './Seller.scss';
import { useNavigate } from 'react-router-dom';

const Seller = () => {
  const [formData, setFormData] = useState({
    company_name: '',
    company_email: '',
    owner_phone: '',
    company_region: '',
    company_city: '',
    company_address: '',
    owner_name: '',
    owner_lastname: '',
    rne_number: '',
    tax_identification: '',
  });
  const navigate = useNavigate();
  const handleInputsChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (!pdfFile) {
      console.log('No PDF file selected.');
      return;
    }
    const imageData = new FormData();
    imageData.append('files', pdfFile);

    const uploadResponse = await axios.post(
      'http://localhost:1337/api/upload',
      imageData
    );

    // Then, send the form data along with the uploaded image to our Strapi endpoint
    const { url } = uploadResponse.data[0];
    const formDataWithImage = new FormData();
    formDataWithImage.append(
      'data',
      JSON.stringify({
        company_name: formData.company_name,
        company_email: formData.company_email,
        owner_phone: formData.owner_phone,
        company_region: formData.company_region,
        company_city: formData.company_city,
        company_address: formData.company_address,
        owner_name: formData.owner_name,
        owner_lastname: formData.owner_lastname,
        rne_number: formData.rne_number,
        tax_identification: formData.tax_identification,
        link_id_img: url, // Set the URL of the uploaded image as the value for the id_img field
      })
    );

    axios
      .post('http://localhost:1337/api/become-sellers', formDataWithImage)
      .then((response) => {
        navigate('/sellersuccess')
      })
      .catch((error) => {
        console.log(error);
      });

    setIsLoading(false);
  };

  return (
    <div className="seller-container">
      <Row align="middle">
        <Col>
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
            <Form name="basic" autoComplete="on">
              <Form.Item
              label="Company name:"
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
              >
                <Input
                  name="company_email"
                  placeholder="Company email"
                  onChange={handleInputsChange}
                  value={formData.company_email}
                />
              </Form.Item>
              <Form.Item label="Company phone:">
                <Input
                  name="owner_phone"
                  placeholder="Company phone"
                  prefix="+216"
                  value={formData.company_phone}
                  onChange={handleInputsChange}
                  type="number"
                />
              </Form.Item>
              <Form.Item label="Company region" name="company_region">
                <Input
                  name="company_region"
                  placeholder="Company region"
                  value={formData.company_region}
                  onChange={handleInputsChange}
                />
              </Form.Item>
              <Form.Item label="Company city" name="company_city">
                <Input
                  name="company_city"
                  value={formData.company_city}
                  placeholder="Company city"
                  onChange={handleInputsChange}
                />
              </Form.Item>
              <Form.Item label="Company address:">
                <Input
                  name="company_address"
                  placeholder="Company address"
                  onChange={handleInputsChange}
                  value={formData.company_address}
                />
              </Form.Item>
              <Form.Item label="Owner name:">
                <Input
                  placeholder="Owner name"
                  name="owner_name"
                  onChange={handleInputsChange}
                  value={formData.owner_name}
                />
              </Form.Item>
              <Form.Item label="Owner last name:">
                <Input
                  name="owner_lastname"
                  placeholder="Owner last name"
                  onChange={handleInputsChange}
                  value={formData.owner_lastname}
                />
              </Form.Item>
              <Form.Item label="Number of national business register (rne):">
                <Input
                  name="rne_number"
                  placeholder="NBR number"
                  onChange={handleInputsChange}
                  value={formData.rne_number}
                  type="number"
                />
              </Form.Item>
              <Form.Item label="Number of tax identification card (patente):">
                <Input
                  name="tax_identification"
                  placeholder="Tax identification"
                  onChange={handleInputsChange}
                  value={formData.tax_identification}
                  type="number"
                />
              </Form.Item>
              <p>
                <span>NB : </span>The file you provide should be a PDF and
                include copies of company patent, company RNE, and owner
                identification (Passport or ID).
              </p>
              <Form.Item label="File">
                <Upload
                  beforeUpload={(file) => {
                    if (file.type === 'application/pdf') {
                      setPdfFile(file);
                    }
                    return false;
                  }}
                  fileList={[]}
                  accept="application/pdf"
                >
                  <Button icon={<UploadOutlined />}>Select PDF</Button>
                </Upload>
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
