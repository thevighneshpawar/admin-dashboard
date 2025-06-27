import React from 'react';
import { Card, Col, Row, Typography, Tag, List, Space, Button } from 'antd';
import {
  ShoppingOutlined,
  DollarCircleOutlined,
  LineChartOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const Homepage = () => {
  const user = { firstName: 'Rakesh' };

  const recentOrders = [
    { name: 'Rakesh Kohli', address: 'main street, bandra', price: '₹1250', status: 'Preparing' },
    { name: 'John Doe', address: 'side street, bandra', price: '₹900', status: 'On the way' },
    { name: 'Naman Kar', address: 'down street, bandra', price: '₹1900', status: 'Delivered' },
  ];

  return (
    <div style={{
      padding: '16px',
      background: '#f5f5f5',
      minHeight: '100vh',
      '@media (min-width: 768px)': {
        padding: '24px'
      }
    }}>
      <Title level={3} style={{ marginBottom: '24px' }}>
        Good morning {user.firstName} 😊
      </Title>

      <Row gutter={[16, 16]} align="top">
        {/* Left section - Stats and Chart */}
        <Col xs={24} lg={16}>
          {/* Stats Cards Row */}
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col xs={24} sm={12}>
              <Card style={{ borderRadius: 12, height: '100%' }}>
                <Space direction="horizontal" align="center">
                  <ShoppingOutlined style={{ fontSize: 30, color: 'green' }} />
                  <div>
                    <Text strong style={{ display: 'block' }}>Total orders</Text>
                    <Title level={3} style={{ margin: 0 }}>28</Title>
                  </div>
                </Space>
              </Card>
            </Col>
            <Col xs={24} sm={12}>
              <Card style={{ borderRadius: 12, height: '100%' }}>
                <Space direction="horizontal" align="center">
                  <DollarCircleOutlined style={{ fontSize: 30, color: '#1890ff' }} />
                  <div>
                    <Text strong style={{ display: 'block' }}>Total sale</Text>
                    <Title level={3} style={{ margin: 0 }}>₹ 50,000</Title>
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>

          {/* Sales Chart */}
          <Card
            style={{ borderRadius: 12 }}
            title={
              <Space>
                <LineChartOutlined style={{ color: '#1890ff' }} />
                <Text strong>Sales</Text>
              </Space>
            }
            extra={
              <Space size="small">
                <Button size="small" shape="circle">W</Button>
                <Button size="small" shape="circle" type="primary">M</Button>
                <Button size="small" shape="circle">Y</Button>
              </Space>
            }
          >
            <div style={{
              height: 200,
              background: '#eee',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#999'
            }}>
              Graph Placeholder
            </div>
          </Card>
        </Col>

        {/* Right section: Recent Orders */}
        <Col xs={24} lg={8}>
          <Card
            title="Recent Orders"
            style={{ borderRadius: 12, height: 'fit-content' }}
          >
            <List
              dataSource={recentOrders}
              renderItem={(item) => (
                <List.Item style={{ padding: '12px 0' }}>
                  <div style={{ width: '100%' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}>
                      <div style={{ flex: 1, minWidth: '120px' }}>
                        <Text strong style={{ display: 'block' }}>
                          {item.name}
                        </Text>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          {item.address}
                        </Text>
                      </div>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        gap: '4px'
                      }}>
                        <Text strong>{item.price}</Text>
                        <Tag
                          size="small"
                          color={
                            item.status === 'Preparing' ? 'red' :
                              item.status === 'On the way' ? 'blue' :
                                'green'
                          }
                        >
                          {item.status}
                        </Tag>
                      </div>
                    </div>
                  </div>
                </List.Item>
              )}
            />
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <Text
                type="secondary"
                style={{
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                See all orders
              </Text>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Homepage;