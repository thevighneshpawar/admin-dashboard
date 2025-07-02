import { Button, Card, Col, Form, Input, Row, Select } from 'antd'
import React from 'react'
import { PlusOutlined } from '@ant-design/icons'

type usersFilterProps = {
    children?: React.ReactNode,
    //onFilterChange: (filterName: string, filterValue: string) => void
}

const UsersFilter = ({ children }: usersFilterProps) => {
    return (
        <Card>
            <Row justify={'space-between'}>
                <Col>
                    <Row>

                        <Col>
                            <Form.Item name="q">

                                <Input.Search
                                    placeholder='search'
                                />

                            </Form.Item>
                        </Col>

                        <Col>
                            <Form.Item name="role">
                                <Select
                                    style={{ width: 150, marginLeft: 10 }}
                                    allowClear={true}
                                    placeholder='Select Role'

                                >
                                    <Select.Option value='admin'>Admin</Select.Option>
                                    <Select.Option value='customer'>Customer</Select.Option>
                                    <Select.Option value='manager'>Manager</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        {/* <Col>
                            <Select
                                style={{ width: 150, marginLeft: 10 }}
                                placeholder='Status'
                                onChange={(selected) =>
                                    onFilterChange('statusFilter', selected)
                                }
                            >
                                <Select.Option value='ban'>Ban</Select.Option>
                                <Select.Option value='active'>Active</Select.Option>
                            </Select>
                        </Col> */}
                    </Row>
                </Col>
                <Col>
                    {children}
                </Col>
            </Row>
        </Card>
    )
}

export default UsersFilter
