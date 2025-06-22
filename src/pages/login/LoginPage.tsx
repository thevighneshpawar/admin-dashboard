import React from 'react'
import { Layout, Card, Space, Form, Input, Checkbox, Button, Flex, Alert } from 'antd'
import { LockFilled, LockOutlined, UserOutlined } from '@ant-design/icons'
import Logo from '../../icons/Logo'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { crendentials } from '../../types'
import { login, self } from '../../http/api'
import { useAuthStore } from '../../store'

const loginUser = async (crendentials:crendentials) => {
  // Simulate a login API call
 const response = await login(crendentials);
 return response;
  
}

const getSelf = async () => {
  const { data } = await self();

  return data;
 
  
};

const LoginPage = () => {

  const {setUser} = useAuthStore();


  const{data:selfData,refetch} = useQuery({
    queryKey:['self'],
    queryFn:getSelf,
    enabled:false ,// if it is true then it will automatically called when cmponent render

  })

  // react query used to manage the state of serverside data // const { data, isLoading, error } = useQuery('login', fetchLoginData)
  //it supports caching, background updates, and more.

  const{mutate, isPending ,isError,error}=useMutation({
    mutationKey: ['login'],
    mutationFn:loginUser,
    onSuccess:async()=>{

      const data =  await refetch();
      console.log(data);
      
      setUser(data.data);
    }

  })

  return (
    <>
      <Layout
        style={{ height: '100vh', display: 'grid', placeItems: 'center' }}
      >
        <Space direction='vertical' align='center' size={'large'}>
         
          <Layout.Content
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
           <Logo/>
          </Layout.Content>

            <Card
            variant={'borderless'}
            style={{ width: 300 }}
            title={
              <Space
              style={{
                width: '100%',
                justifyContent: 'center',
                fontSize: 16
              }}
              >
              <LockFilled />
              Sign in
              </Space>
            }
            >

              {
                isError && (
                  <Alert 
                  style={{marginBottom:24}}
                  type='error' message={error?.message}/>
                )
              }
            <Form initialValues={{ remember: true }}
              onFinish={(values)=>{
              mutate({email:values.username,password:values.password})
              console.log(values);
              
            }}
            >
              <Form.Item
              name='username'
              rules={[
                {
                required: true,
                message: 'Please input your username!'
                },
                {
                type: 'email',
                message: 'Please input a valid email address!'
                }
              ]}
              >
              <Input prefix={<UserOutlined />} placeholder='Username' />
              </Form.Item>
              <Form.Item
              name='password'
              rules={[
                {
                required: true,
                message: 'Please input your Password!'
                }
              ]}
              >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder='Password'
              />
              </Form.Item>
              <Flex justify='space-between'>
              <Form.Item name='remember' valuePropName='checked'>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a href='' id='login-form-forgot'>
                Forgot password?
              </a>
              </Flex>
              <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                style={{ width: '100%' }}
                loading={isPending}
              >
                Log in
              </Button>
              </Form.Item>
            </Form>
            </Card>

        </Space>
      </Layout>
    </>
  )
}

export default LoginPage
