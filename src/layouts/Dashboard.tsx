import React, { useState } from 'react'
import { Navigate, NavLink, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store'
import Icon, { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import Logo from '../icons/Logo';
import Home from '../icons/Home';
import UserIcon from '../icons/UserIcon';
import { foodIcon } from '../icons/FoodIcon';
import { BagIcon } from '../icons/BagIcon';
import GiftIcon from '../icons/GiftIcon';

const items = [
    {
        key: '/',
        icon: <Icon component={Home} />,
        label: <NavLink to="/">Home</NavLink>

    },
    {
        key: '/users',
        icon: <Icon component={UserIcon} />,
        label: <NavLink to="/users">Users</NavLink>

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

const Dashboard = () => {

    const { user } = useAuthStore()
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
                    <Header style={{ padding: 0, background: colorBgContainer }} />
                    <Content style={{ margin: '0 16px' }}>

                        <Outlet />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Pizza Shop
                    </Footer>
                </Layout>
            </Layout>
            <Outlet />
        </div>
    )
}

export default Dashboard