import { Card, Col, Form, Input, Row, } from 'antd'
import React from 'react'


type RestaurantFilterProps = {
    children?: React.ReactNode,
    //onFilterChange: (filterName: string, filterValue: string) => void
}

const RestaurantFilter = ({ children }: RestaurantFilterProps) => {
    return (
        <Card>
            <Row justify={'space-between'}>
                <Form.Item name='q'>


                    <Col span={12} >

                        <Input.Search

                            placeholder='search'

                        />

                    </Col>
                </Form.Item>
                <Col>
                    {children}
                </Col>
            </Row>
        </Card>
    )
}

export default RestaurantFilter
