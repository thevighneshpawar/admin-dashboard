import { Breadcrumb, Space, Flex } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'


const ProductPage = () => {
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
                        items={[{ title: <Link to='/'>Dashboard</Link> }, { title: 'Products' }]}
                    />
                    {/* {isFetching && <Spin indicator={<LoadingOutlined spin />} />}
                    {isError && (
                        <p>
                            Error:{' '}
                            {error instanceof Error ? error.message : 'An error occurred'}
                        </p>
                    )} */}
                </Flex>

            </Space>
        </div>
    )
}

export default ProductPage