import { Breadcrumb, Button, Drawer, Flex, Form, Space, Spin, Table, theme } from 'antd'
import React, { useMemo, useState } from 'react'
import { LoadingOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons'
import { Link, Navigate } from 'react-router-dom'
import { createUser, getUsers } from '../../http/api'
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { createUserData, FieldData, User } from '../../types'
import { useAuthStore } from '../../store'
import UsersFilter from './UsersFilter'
import UserForm from './forms/UserForm'
import { PER_PAGE } from '../../constants'
import { debounce } from 'lodash'

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
    },
    {
        title: 'Restaurant',
        dataIndex: 'tenant',
        key: 'tenant',
        render: (_text: string, record: User) => (
            <div>{record.tenant?.name ? record.tenant.name : " "}</div>
        )

    }
]

const Userspage = () => {

    const queryClient = useQueryClient() // react query client to manage the state of serverside data

    const [form] = Form.useForm() // antd form it gies all data of form
    const [filterForm] = Form.useForm()


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


    const [queryParams, setQueryParams] = useState({

        currentPage: 1,
        perPage: PER_PAGE,

    }) // state to manage the query parameters for pagination and sorting



    const [draweropen, setDrawerOpen] = useState(false)
    const { data, isFetching, isError, error } = useQuery({
        queryKey: ['users', queryParams],
        queryFn: () => {
            // const queryString = `?currentPage=${queryParams.currentPage}&perPage=${queryParams.perPage}`; // construct the query string for pagination

            const filteredParams = Object.fromEntries(
                Object.entries(queryParams).filter((item) => !!item[1]) // filter out empty values from queryParams
            )
            const queryString = new URLSearchParams(filteredParams as unknown as Record<string, string>).toString()


            return getUsers(queryString).then(res => res.data); // fetch users data from the server
        },
        placeholderData: keepPreviousData
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
    const users = data?.data || []

    const debouncedQUpdate = useMemo(() => {

        return debounce((value: string | undefined) => {
            setQueryParams((prev) => ({
                ...prev,
                q: value,
                currentPage: 1,
            }))
        }, 1000)

    }, [])

    const onFilterChange = (changedValues: FieldData[]) => {
        //console.log('changedValues', changedValues);

        const changedFilterFields = changedValues.map((item) => ({
            [item.name[0]]: item.value,
        })).reduce((acc, item) => ({ ...acc, ...item }), {})

        //console.log(changedFilterFields);


        if ('q' in changedFilterFields) {

            debouncedQUpdate(changedFilterFields.q as string) // if q is changed, update the query params with debounce

        } else {

            setQueryParams((prev) => ({
                ...prev,
                ...changedFilterFields,
                currentPage: 1,
            }))
        }



    }

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
                <Flex justify='space-between'>
                    <Breadcrumb
                        separator={<RightOutlined />}
                        items={[{ title: <Link to='/'>Dashboard</Link> }, { title: 'Users' }]}
                    />
                    {isFetching && <Spin indicator={<LoadingOutlined spin />} />}
                    {isError && (
                        <p>
                            Error:{' '}
                            {error instanceof Error ? error.message : 'An error occurred'}
                        </p>
                    )}
                </Flex>

                <Form form={filterForm} onFieldsChange={onFilterChange}>
                    <UsersFilter>

                        <Button
                            type='primary'
                            icon={<PlusOutlined />}
                            onClick={() => setDrawerOpen(true)}
                        >
                            Create User
                        </Button>
                    </UsersFilter>
                </Form>


                <Table
                    columns={columns}
                    dataSource={users}
                    pagination={{
                        current: queryParams.currentPage,
                        pageSize: queryParams.perPage,
                        total: data?.total || 0,
                        showTotal: (total, range) => `Showing ${range[0]} - ${range[1]} of Total ${total} items`,
                        onChange: (page, pageSize) => {
                            setQueryParams({
                                ...queryParams,
                                currentPage: page,
                                perPage: pageSize
                            })
                        }
                    }}
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
