import React from "react";
    import { Button, Card, Col, Form, Input, message, Row, Spin } from "antd";
    import { useAuthContext } from "../../context/AuthContext";
    import { API } from "../../constant";
    import { useState } from "react";
    import { getToken } from "../../helpers";
    
    const Profile = () => {
      const [loading, setLoading] = useState(false);
      const { user, isLoading, setUser } = useAuthContext();
    
      const handleProfileUpdate = async (data) => {
        setLoading(true);
        try {
          const response = await fetch(`${API}/users/${user.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              // set the auth token to the user's jwt
              Authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify(data),
          });
          const responseData = await response.json();
    
          setUser(responseData);
          message.success("Data saved successfully!");
        } catch (error) {
          console.error(Error);
          message.error("Error While Updating the Profile!");
        } finally {
          setLoading(false);
        }
      };
    
      if (isLoading) {
        return <Spin size="large" />;
      }
    
      return (
        <Card className="profile_page_card">
          <Form
            layout="vertical"
            initialValues={{
              username: user?.username,
              email: user?.email,
              Phone: user?.Phone,
              Adresse: user?.Adresse,
              Region: user?.Region,
              avatar_url: user?.avatar_url,
              City: user?.City,
              last_name: user?.last_name,
            }}
            onFinish={handleProfileUpdate}
          >
            <Row gutter={[16, 16]}>
              <Col md={8} lg={8} sm={24} xs={24}>
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Username is required!",
                      type: "string",
                    },
                  ]}
                >
                  <Input placeholder="Username" />
                </Form.Item>
              </Col>
              <Col md={8} lg={8} sm={24} xs={24}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Email is required!",
                      type: "email",
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
              </Col>
              <Col md={8} lg={8} sm={24} xs={24}>
                <Form.Item
                  label="Avatar Url"
                  name="avatar_url"
                  rules={[
                    {
                      type: "url",
                    },
                  ]}
                >
                  <Input placeholder="Avatar Url" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="last_name"
                  name="last_name"
                  rules={[
                    {
                      required: true,
                      type: "string",
                      max: 35,
                    },
                  ]}
                >
                  <Input placeholder="last_name" rows={6} />
                </Form.Item>
              </Col>
              <Col md={8} lg={8} sm={24} xs={24}>
                <Form.Item
                  label="Phone"
                  name="Phone"
                  rules={[
                    {
                      type: "string",
                    },
                  ]}
                >
                  <Input placeholder="Phone" />
                </Form.Item>
              </Col>
              <Col md={8} lg={8} sm={24} xs={24}>
                <Form.Item
                  label="Adresse"
                  name="Adresse"
                  rules={[
                    {
                      type: "string",
                    },
                  ]}
                >
                  <Input placeholder="Adresse" />
                </Form.Item>
              </Col>
              <Col md={8} lg={8} sm={24} xs={24}>
                <Form.Item
                  label="Region"
                  name="Region"
                  rules={[
                    {
                      type: "string",
                    },
                  ]}
                >
                  <Input placeholder="Region" />
                </Form.Item>
              </Col>
              <Col md={8} lg={8} sm={24} xs={24}>
                <Form.Item
                  label="City"
                  name="City"
                  rules={[
                    {
                      type: "string",
                    },
                  ]}
                >
                  <Input placeholder="City" />
                </Form.Item>
              </Col>
            </Row>
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
                "Save"
              )}
            </Button>
          </Form>
        </Card>
      );
    };
    
    export default Profile;