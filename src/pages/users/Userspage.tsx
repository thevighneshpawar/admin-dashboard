import { Breadcrumb, Button, Drawer, Space, Table } from 'antd'
import React, { useState } from 'react'
import { PlusOutlined, RightOutlined } from '@ant-design/icons'
import { Link, Navigate } from 'react-router-dom'
import { getUsers } from '../../http/api'
import { useQuery } from '@tanstack/react-query'
import type { User } from '../../types'
import { useAuthStore } from '../../store'
import UsersFilter from './UsersFilter'

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Name',
        dataIndex: 'firstName',
        key: 'firstName',
        render: (_text: string, record: User) => (
            <div>{`${record.firstName} ${record.lastName}`}</div>
        )
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email'
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role'
    }
]

const Userspage = () => {

    const [draweropen, setDrawerOpen] = useState(false)
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers
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

    const users = data?.data.data || []
    return (
        <div>
            <Space
                size={'large'}
                style={{ width: '100%' }}
                direction='vertical'
            >
                <Breadcrumb
                    separator={<RightOutlined />}
                    items={[{ title: <Link to='/'>Dashboard</Link> }, { title: 'Users' }]}
                />
                {isLoading && <p>Loading...</p>}
                {isError && (
                    <p>
                        Error:{' '}
                        {error instanceof Error ? error.message : 'An error occurred'}
                    </p>
                )}

                <UsersFilter
                    onFilterChange={(filterName, filterValue) => {
                        console.log(`Filter changed: ${filterName} = ${filterValue}`)
                    }}
                >

                    <Button
                        type='primary'
                        icon={<PlusOutlined />}
                        onClick={() => setDrawerOpen(true)}
                    >
                        Create User
                    </Button>
                </UsersFilter>
                <Table
                    columns={columns}
                    dataSource={users}
                />

                <Drawer
                    title='Create user'
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

export default Userspage
