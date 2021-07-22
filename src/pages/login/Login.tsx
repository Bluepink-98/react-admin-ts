import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';

import { RuleObject } from 'antd/lib/form';
import { StoreValue } from 'antd/lib/form/interface';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Redirect } from 'react-router';
import { signIn } from '../../utils/requests/login';

import './login.css';
import logo from '../../assets/images/logo.png';
import memoryUtils from '../../utils/memory/memoryUtils';
import storageUtils from '../../utils/memory/storageUtils';

export interface IAuthModel {
    username: string;
    password: string;
    remember?: boolean;
}
interface IProps {
    signIn: (data: IAuthModel) => any;
}
class Login extends Component<IProps & RouteComponentProps, {}> {
    validator = (rule: RuleObject, value: StoreValue) => {
        if (!value) {
            return Promise.reject('密码必须输入');
        } else if (value.length < 3 || value.length > 12) {
            return Promise.reject('密码长度不能小于4位或大于12位');
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            return Promise.reject('密码必须是英文，数字和下划线组成');
        } else {
            return Promise.resolve();
        }
    };

    layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    onFinish = async (values: IAuthModel | any) => {
        const result = await signIn({
            ...values,
        });
        if (result.status === 0) {
            message.success('登录成功');
            const user = result.data;
            memoryUtils.user = user; //保存在内存中
            storageUtils.saveUser(user); //保存在localstorage中
            this.props.history.replace('/');
        } else {
            message.error('登录失败');
        }
    };

    onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    render() {
        const user = memoryUtils.user;
        if (user) {
            return <Redirect to='/'></Redirect>;
        }
        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt='logo' />
                    <h1>React项目: 后台管理系统</h1>
                </header>
                <section className='login-content'>
                    <h2>用户登录</h2>
                    <Form
                        {...this.layout}
                        name='basic'
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                    >
                        <Form.Item
                            label='Username'
                            name='username'
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: 'Please input your username!',
                                },
                                {
                                    max: 12,
                                    message: '用户名最多十二位',
                                },
                                {
                                    min: 3,
                                    message: '用户名至少三位',
                                },
                                {
                                    pattern: /^[a-zA-Z0-9_]+$/,
                                    message:
                                        '用户名必须是英文,数字和下划线组成',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label='Password'
                            name='password'
                            rules={[
                                {
                                    validator: this.validator,
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            {...this.tailLayout}
                            name='remember'
                            valuePropName='checked'
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item {...this.tailLayout}>
                            <Button type='primary' htmlType='submit'>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        );
    }
}
export default withRouter(Login);
