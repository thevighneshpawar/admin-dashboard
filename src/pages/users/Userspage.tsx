import { Breadcrumb, Button, Drawer, Form, Space, Table, theme } from 'antd'
import React, { useState } from 'react'
import { PlusOutlined, RightOutlined } from '@ant-design/icons'
import { Link, Navigate } from 'react-router-dom'
import { createUser, getUsers } from '../../http/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { createUserData, User } from '../../types'
import { useAuthStore } from '../../store'
import UsersFilter from './UsersFilter'
import UserForm from './forms/UserForm'
import create from '@ant-design/icons/lib/components/IconFont'

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

    const queryClient = useQueryClient() // react query client to manage the state of serverside data

    const [form] = Form.useForm() // antd form it gies all data of form

    const { mutate: userMutate } = useMutation({
        mutationKey: ["user"],
        mutationFn: async (user: createUserData) => createUser(user).then(res => res.data),
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ['users'] }) // invalidate the users query to refetch the data
            return;
        },
    });

    const {
        token: { colorBgLayout },
    } = theme.useToken();

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

    const onHandleSubmit = async () => {

        await form.validateFields() // validate the form fields
        await userMutate(form.getFieldsValue()) // get the form data and pass it to the mutation
        form.resetFields()
        setDrawerOpen(false) // close the drawer after successful submission
    }
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
                    styles={{ body: { backgroundColor: colorBgLayout } }}
                    destroyOnHidden={true}
                    onClose={() => {
                        form.resetFields(); // reset the form fields when drawer is closed
                        setDrawerOpen(false)
                    }}
                    open={draweropen}
                    extra={<Space>
                        <Button type="primary" onClick={onHandleSubmit}>Save</Button>
                        <Button onClick={() => {
                            form.resetFields();
                            setDrawerOpen(false);
                        }}>Cancel</Button>
                    </Space>}
                >

                    <Form form={form} layout='vertical'>
                        <UserForm />
                    </Form>
                </Drawer>
            </Space>
        </div>
    )
}

export default Userspage
