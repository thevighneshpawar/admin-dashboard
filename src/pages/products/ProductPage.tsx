import { Breadcrumb, Space, Flex, Form, Button } from 'antd'
import { RightOutlined, PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import ProductFilter from './ProductFilter'


const ProductPage = () => {

    const [filterForm] = Form.useForm()
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

                </Flex>

                <Form form={filterForm} onFieldsChange={() => { }}>
                    <ProductFilter>

                        <Button
                            type='primary'
                            icon={<PlusOutlined />}
                            onClick={() => { }}
                        >
                            Create Product
                        </Button>
                    </ProductFilter>
                </Form>

            </Space>
        </div>
    )
}

export default ProductPage