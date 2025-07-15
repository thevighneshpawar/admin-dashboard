import { Card, Col, Form, Input, Row, Select, Space, Switch, Typography } from 'antd'
import React from 'react'


type productsFilterProps = {
    children?: React.ReactNode,
    //onFilterChange: (filterName: string, filterValue: string) => void
}

const ProductFilter = ({ children }: productsFilterProps) => {





    return <Card>
        <Row justify={'space-between'} align={'middle'}>
            <Col>
                <Row gutter={10} align={'middle'}>
                    <Col>
                        <Form.Item name="q" style={{ marginBottom: 0 }}>
                            <Input.Search placeholder='search' />
                        </Form.Item>
                    </Col>

                    <Col>
                        <Form.Item name="category" style={{ marginBottom: 0 }}>
                            <Select
                                style={{ width: 150, marginLeft: 10 }}
                                allowClear={true}
                                placeholder='Select Category'
                            >
                                <Select.Option value='admin'>Admin</Select.Option>
                                <Select.Option value='customer'>Customer</Select.Option>
                                <Select.Option value='manager'>Manager</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col>
                        <Form.Item name="tenant" style={{ marginBottom: 0 }}>
                            <Select
                                style={{ width: 150, marginLeft: 10 }}
                                allowClear={true}
                                placeholder='Select Restaurant'
                            >
                                <Select.Option value='admin'>Admin</Select.Option>
                                <Select.Option value='customer'>Customer</Select.Option>
                                <Select.Option value='manager'>Manager</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col>
                        <Form.Item name="ispublish" style={{ marginBottom: 0 }}>
                            <Space>
                                <Switch defaultChecked />
                                <Typography.Text>
                                    Show Only Published
                                </Typography.Text>
                            </Space>
                        </Form.Item>
                    </Col>
                </Row>
            </Col>
            <Col>
                {children}
            </Col>
        </Row>
    </Card>
}

export default ProductFilter