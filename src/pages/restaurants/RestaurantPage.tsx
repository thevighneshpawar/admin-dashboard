import { Breadcrumb, Button, Drawer, Form, Space, Table } from 'antd'
import React, { useState } from 'react'
import { PlusOutlined, RightOutlined } from '@ant-design/icons'
import { Link, Navigate } from 'react-router-dom'
import { createTenants, getRestaurants, } from '../../http/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useAuthStore } from '../../store'
import RestaurantForm from './forms/RestaurantForm'
import RestaurantFilter from './RestaurantFilter'
import type { createTenantData } from '../../types'

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


    const queryClient = useQueryClient() // react query client to manage the state of serverside data

    const [form] = Form.useForm() // antd form it gies all data of form

    const { mutate: tenantMutate } = useMutation({
        mutationKey: ["tenant"],
        mutationFn: async (tenant: createTenantData) => createTenants(tenant).then(res => res.data),
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ['tenants'] }) // invalidate the tenants query to refetch the data
            return;
        },
    });


    const onHandleSubmit = async () => {

        await form.validateFields() // validate the form fields
        await tenantMutate(form.getFieldsValue()) // get the form data and pass it to the mutation
        form.resetFields()
        setDrawerOpen(false) // close the drawer after successful submission
    }

    const [draweropen, setDrawerOpen] = useState(false)
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['tenants'],
        queryFn: getRestaurants
    })
    const restaurants = data?.data.data || []
    const { user } = useAuthStore()
    if (user?.role !== 'admin') {
        return (
            <Navigate
                to='/'
                replace
            />
        ) // Redirect if not admin
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
                        <Button type="primary" onClick={onHandleSubmit}>Save</Button>
                        <Button onClick={() => setDrawerOpen(false)}>Cancel</Button>
                    </Space>}
                >

                    <Form form={form}>
                        < RestaurantForm />
                    </Form>
                </Drawer>
            </Space>
        </div>
    )
}

export default RestaurantPage
