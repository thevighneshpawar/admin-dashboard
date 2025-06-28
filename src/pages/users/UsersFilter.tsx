import { Button, Card, Col, Input, Row, Select } from 'antd'
import React from 'react'
import { PlusOutlined } from '@ant-design/icons'

type usersFilterProps = {
    onFilterChange: (filterName: string, filterValue: string) => void
}

const UsersFilter = ({ onFilterChange }: usersFilterProps) => {
    return (
        <Card>
            <Row justify={'space-between'}>
                <Col>
                    <Row>
                        <Col>
                            <Input.Search
                                placeholder='search'
                                onChange={(e) =>
                                    onFilterChange('UserSearchQuery', e.target.value)
                                }
                            />
                        </Col>
                        <Col>
                            <Select
                                style={{ width: 150, marginLeft: 10 }}
                                allowClear={true}
                                placeholder='Select Role'
                                onChange={(selected) =>
                                    onFilterChange('roleFilter', selected)
                                }

                            >
                                <Select.Option value='admin'>Admin</Select.Option>
                                <Select.Option value='customer'>Customer</Select.Option>
                                <Select.Option value='manager'>Manager</Select.Option>
                            </Select>
                        </Col>
                        <Col>
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
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Button
                        type='primary'
                        icon={<PlusOutlined />}
                    >
                        Create User
                    </Button>
                </Col>
            </Row>
        </Card>
    )
}

export default UsersFilter
