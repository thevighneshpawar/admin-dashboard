import React, { useState } from 'react'
import { Navigate, NavLink, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store'
import Icon, { BellFilled, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Breadcrumb, Dropdown, Flex, Layout, Menu, Space, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import Logo from '../icons/Logo';
import Home from '../icons/Home';
import UserIcon from '../icons/UserIcon';
import { foodIcon } from '../icons/FoodIcon';
import { BagIcon } from '../icons/BagIcon';
import GiftIcon from '../icons/GiftIcon';
import { useLogout } from '../hooks/useLogout';

const getMenuItems = (role: string) => {

    const baseItems = [

        {
            key: '/',
            icon: <Icon component={Home} />,
            label: <NavLink to="/">Home</NavLink>

        },

        {
            key: '/restaurants',
            icon: <Icon component={foodIcon} />,
            label: <NavLink to="/restaurants">Restaurants</NavLink>

        },
        {
            key: '/products',
            icon: <Icon component={BagIcon} />,
            label: <NavLink to="/products">Products</NavLink>

        },
        {
            key: '/promos',
            icon: <Icon component={GiftIcon} />,
            label: <NavLink to="/promos">Promos</NavLink>

        },

    ]

    if (role === 'admin') {
        const menus = [...baseItems]

        menus.splice(1, 0, {
            key: '/users',
            icon: <Icon component={UserIcon} />,
            label: <NavLink to="/users">Users</NavLink>

        })


        return menus;

    }

    return baseItems;
}



const Dashboard = () => {



    const { user } = useAuthStore()
    const items = getMenuItems(user?.role || 'user');

    const { logoutMutate } = useLogout();

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    if (user === null) {
        return <Navigate to="/auth/login" replace={true} />;
    }
    return (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    theme='light'
                    collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className="logo" >
                        <Logo />
                    </div>
                    <Menu theme="light" defaultSelectedKeys={['/']} mode="inline" items={items} />
                </Sider>
                <Layout>
                    <Header style={{ paddingLeft: "16px", paddingRight: "16px", background: colorBgContainer }} >

                        <Flex gap="middle" align="start" justify='space-between' >
                            <Badge text={user.role == "admin" ? "You are an admin" : user.tenant?.name} status='success' />

                            <Space size={16}>
                                <Badge dot={true}>
                                    <BellFilled />
                                </Badge>
                                <Dropdown menu={{
                                    items: [
                                        {
                                            key: 'Logout',
                                            label: "Logout",
                                            onClick: () => {
                                                logoutMutate();
                                            }
                                        },

                                    ]
                                }} placement="bottomRight" arrow>
                                    <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>U</Avatar>
                                </Dropdown>

                            </Space>
                        </Flex>


                    </Header>
                    <Content style={{ margin: '24px' }}>

                        <Outlet />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Pizza Shop
                    </Footer>
                </Layout>
            </Layout>
        </div>
    )
}

export default Dashboard