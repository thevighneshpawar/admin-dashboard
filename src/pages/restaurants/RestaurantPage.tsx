import { Breadcrumb, Button, Drawer, Form, Space, Table } from 'antd'
import React, { useMemo, useState } from 'react'
import { PlusOutlined, RightOutlined } from '@ant-design/icons'
import { Link, Navigate } from 'react-router-dom'
import { createTenants, getRestaurants, } from '../../http/api'
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useAuthStore } from '../../store'
import RestaurantForm from './forms/RestaurantForm'
import RestaurantFilter from './RestaurantFilter'
import type { createTenantData, FieldData } from '../../types'
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
    const [restoForm] = Form.useForm()
    const [queryParams, setQueryParams] = useState({
        currentPage: 1,
        perPage: PER_PAGE,
    }) // state to manage the pagination of the table

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
        queryKey: ['tenants', queryParams], // query key to identify the query
        queryFn: () => {
            // const queryString = `?currentPage=${queryParams.currentPage}&perPage=${queryParams.perPage}`; // construct the query string for pagination

            const filteredParams = Object.fromEntries(
                Object.entries(queryParams).filter((item) => !!item[1]) // filter out empty values from queryParams
            )
            const queryString = new URLSearchParams(filteredParams as unknown as Record<string, string>).toString()


            return getRestaurants(queryString).then(res => res.data); // fetch users data from the server
        },
        placeholderData: keepPreviousData
    })
    const restaurants = data?.data || []

    const debouncedQUpdate = useMemo(() => {
        return debounce((value: string | undefined) => {
            setQueryParams((prev) => ({
                ...prev,
                q: value,
                currentPage: 1,
            }))
        }, 1000)
    }, [])

    const { user } = useAuthStore()
    if (user?.role !== 'admin') {
        return (
            <Navigate
                to='/'
                replace
            />
        ) // Redirect if not admin
    }

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

                <Form form={restoForm} onFieldsChange={onFilterChange}>

                    <RestaurantFilter>

                        <Button
                            type='primary'
                            icon={<PlusOutlined />}
                            onClick={() => setDrawerOpen(true)}
                        >
                            Create Restaurant
                        </Button>
                    </RestaurantFilter>
                </Form>

                <Table
                    columns={columns}
                    dataSource={restaurants}
                    pagination={{
                        current: queryParams.currentPage,
                        pageSize: queryParams.perPage,
                        total: data?.total || 0,
                        onChange: (page, pageSize) => {
                            setQueryParams({
                                ...queryParams,
                                currentPage: page,
                                perPage: pageSize
                            })
                        }
                    }} />

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
