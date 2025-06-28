import { Breadcrumb, Button, Drawer, Space, Table } from 'antd'
import React, { useState } from 'react'
import { PlusOutlined, RightOutlined } from '@ant-design/icons'
import { Link, Navigate } from 'react-router-dom'
import { getRestaurants, } from '../../http/api'
import { useQuery } from '@tanstack/react-query'

import { useAuthStore } from '../../store'
import UsersFilter from '../users/UsersFilter'
import RestaurantFilter from './RestaurantFilter'

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',

    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address'
    },

]

const RestaurantPage = () => {

    const [draweropen, setDrawerOpen] = useState(false)
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['tenants'],
        queryFn: getRestaurants
    })

    const { user } = useAuthStore()
    if (user?.role !== 'admin') {
        return (
            <Navigate
                to='/'
                replace
            />
        ) // Redirect if not admin
    }

    const restaurants = data?.data.data || []
    return (
        <div>
            <Space
                size={'large'}
                style={{ width: '100%' }}
                direction='vertical'
            >
                <Breadcrumb
                    separator={<RightOutlined />}
                    items={[{ title: <Link to='/'>Dashboard</Link> }, { title: 'Restaurants' }]}
                />
                {isLoading && <p>Loading...</p>}
                {isError && (
                    <p>
                        Error:{' '}
                        {error instanceof Error ? error.message : 'An error occurred'}
                    </p>
                )}

                <RestaurantFilter
                    onFilterChange={(filterName, filterValue) => {
                        console.log(`Filter changed: ${filterName} = ${filterValue}`)
                    }}
                >

                    <Button
                        type='primary'
                        icon={<PlusOutlined />}
                        onClick={() => setDrawerOpen(true)}
                    >
                        Create Restaurant
                    </Button>
                </RestaurantFilter>
                <Table
                    columns={columns}
                    dataSource={restaurants}
                />

                <Drawer
                    title='Create Restaurant'
                    width={720}
                    destroyOnHidden={true}
                    onClose={() => setDrawerOpen(false)}
                    open={draweropen}
                    extra={<Space>
                        <Button type="primary" onClick={() => setDrawerOpen(false)}>Save</Button>
                        <Button onClick={() => console.log('Cancel')}>Cancel</Button>
                    </Space>}
                >


                    <p>some content............</p>
                    <p>some content............</p>
                    <p>some content............</p>
                    <p>some content............</p>
                </Drawer>
            </Space>
        </div>
    )
}

export default RestaurantPage
