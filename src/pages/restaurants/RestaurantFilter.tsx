import { Card, Col, Input, Row, } from 'antd'
import React from 'react'

type RestaurantFilterProps = {
    children?: React.ReactNode,
    onFilterChange: (filterName: string, filterValue: string) => void
}

const RestaurantFilter = ({ onFilterChange, children }: RestaurantFilterProps) => {
    return (
        <Card>
            <Row justify={'space-between'}>
                <Col span={12} >

                    <Input.Search

                        placeholder='search'
                        onChange={(e) =>
                            onFilterChange('RestaurantearchQuery', e.target.value)
                        }
                    />

                </Col>
                <Col>
                    {children}
                </Col>
            </Row>
        </Card>
    )
}

export default RestaurantFilter
