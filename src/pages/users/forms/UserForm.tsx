import { useQuery } from '@tanstack/react-query'
import { Card, Col, Form, Input, Row, Select, Space } from 'antd'
import React from 'react'
import { getRestaurants } from '../../../http/api'
import type { Tenant } from '../../../types'


const UserForm = () => {

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['tenants'],
        queryFn: getRestaurants
    })
    const restaurants = data?.data.data || []




    return <Row>
        <Col span={24} >
            <Space direction='vertical' size={'large'}>
                <Card title={"Basic Info"}>

                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item label={'First Name'} name="firstName" rules={[
                                { required: true, message: 'First Name is required' },
                                { whitespace: true, message: 'First Name cannot be empty' }
                            ]}>
                                <Input placeholder="First Name" size='large' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={'Last Name'} name="lastName" rules={[
                                { required: true, message: 'last Name is required' },
                                { whitespace: true, message: 'last Name cannot be empty' }
                            ]}>
                                <Input placeholder="last Name" size='large' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={'Email'} name="email" rules={[
                                { required: true, message: 'Email is required' },
                                { type: 'email', message: 'Please enter a valid email address' }
                            ]} >
                                <Input placeholder="Email" size='large' />
                            </Form.Item>
                        </Col>
                    </Row>

                </Card>

                <Card title={"Security Info"} >

                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item label={'Password'} name="password" rules={[
                                { required: true, message: 'Password is required' },
                                { min: 6, message: 'Password must be at least 6 characters' },
                                { whitespace: true, message: 'Password cannot be empty' }
                            ]}>
                                <Input placeholder="Password" type='password' size='large' />
                            </Form.Item>
                        </Col>

                    </Row>

                </Card>

                <Card title={"Auth Info"} >

                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item label={'Role'} name="role" rules={[
                                { required: true, message: 'Role is required' },
                            ]}>
                                <Select
                                    style={{ width: "100%" }}
                                    size='large'
                                    allowClear={true}
                                    placeholder='Select Role'
                                    onChange={() => { }}
                                >
                                    <Select.Option value='admin'>Admin</Select.Option>
                                    <Select.Option value='customer'>Customer</Select.Option>
                                    <Select.Option value='manager'>Manager</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={'Restaurants'} name="tenantId" rules={[{
                                required: true, message: 'Restaurant is required'
                            }]}>
                                <Select
                                    size='large'
                                    style={{ width: "100%" }}
                                    allowClear={true}
                                    placeholder='Select Role'
                                    onChange={() => { }}
                                >

                                    {
                                        restaurants.map((restaurant: Tenant) => (
                                            <Select.Option key={restaurant.id} value={restaurant.id}>
                                                {restaurant.name}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </Col>

                    </Row>

                </Card>
            </Space>
        </Col>

    </Row>
}

export default UserForm