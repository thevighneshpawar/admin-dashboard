import { useQuery } from '@tanstack/react-query'
import { Card, Col, Form, Input, Row, Select, Space, Switch, Typography } from 'antd'
import React from 'react'
import { getCategories, getRestaurants } from '../../http/api'
import type { category, Tenant } from '../../types'
import { useAuthStore } from '../../store'


type productsFilterProps = {
    children?: React.ReactNode,
    //onFilterChange: (filterName: string, filterValue: string) => void
}

const ProductFilter = ({ children }: productsFilterProps) => {

    const { user } = useAuthStore();

    const { data: restaurants } = useQuery({
        queryKey: ['restaurants'],
        queryFn: () => {
            return getRestaurants('perPage=100&currentPage=1')
        },

    })



    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => {
            return getCategories();
        },

    })




    return <Card >
        < Row justify={'space-between'} align={'middle'} >
            <Col>
                <Row gutter={10} align={'middle'}>
                    <Col>
                        <Form.Item name="q" style={{ marginBottom: 0 }}>
                            <Input.Search placeholder='search' />
                        </Form.Item>
                    </Col>

                    <Col>
                        <Form.Item name="categoryId" style={{ marginBottom: 0 }}>
                            <Select
                                style={{ width: 150, marginLeft: 10 }}
                                allowClear={true}
                                placeholder='Select Category'
                            >
                                {
                                    categories?.data.map((category: category) => (
                                        <Select.Option key={category._id} value={category.id}>
                                            {category.name}
                                        </Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Col>

                    {
                        user?.role === 'admin' &&
                        <Col>
                            <Form.Item name="tenantId" style={{ marginBottom: 0 }}>
                                <Select
                                    style={{ width: 150, marginLeft: 10 }}
                                    allowClear={true}
                                    placeholder='Select Restaurant'
                                >
                                    {
                                        restaurants?.data.data.map((restaurant: Tenant) => (
                                            <Select.Option key={restaurant.id} value={restaurant.id}>
                                                {restaurant.name}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                    }

                    <Col>
                        < Space>
                            <Form.Item name="isPublish" style={{ marginBottom: 0 }}>
                                <Switch defaultChecked={false} onChange={() => { }} />
                            </Form.Item>
                            <Typography.Text style={{ marginBottom: 0, display: 'block' }}>
                                Show only published
                            </Typography.Text>
                        </Space>
                    </Col>
                </Row>
            </Col>
            <Col>
                {children}
            </Col>
        </Row >
    </Card >
}

export default ProductFilter