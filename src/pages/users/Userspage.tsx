import { Breadcrumb } from 'antd'
import React from 'react'
import { RightOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const Userspage = () => {
    return (
        <div>
            <Breadcrumb
                separator={<RightOutlined />}
                items={[{ title: <Link to="/">Dashboard</Link> }, { title: 'Users' }]}
            />
        </div>
    )
}

export default Userspage