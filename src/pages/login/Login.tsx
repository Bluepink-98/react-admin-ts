import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';

import { RuleObject } from 'antd/lib/form';
import { StoreValue } from 'antd/lib/form/interface';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Redirect } from 'react-router';
import { signIn } from '../../utils/requests/login';
import logo from '../../assets/images/logo.png';
import memoryUtils from '../../utils/memory/memoryUtils';
import storageUtils from '../../utils/memory/storageUtils';
import './login.css';
export interface IAuthModel {
    username: string;
    password: string;
    captcha: string;
    remember?: boolean;
}
interface IProps {
    signIn: (data: IAuthModel) => any;
}
class Login extends Component<IProps & RouteComponentProps, {}> {
    state = { imgSrc: '/api1/getCaptcha' };

    validator = (rule: RuleObject, value: StoreValue) => {
        if (!value) {
            return Promise.reject('密码必须输入');
        } else if (value.length < 3 || value.length > 12) {
            return Promise.reject('密码长度不能小于4位或大于12位');
        } else if ((/^[a-zA-Z0-9]+$/).test(value)){
            return Promise.reject('密码必须是英文，数字和下划线组成');
        } else {
            return Promise.resolve();
        }
    };

    layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 30 },
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
        } else if (result.status === 1) {
            message.error('用户名或密码不正确!');
        } else {
            message.error('验证码错误');
        }
    };

    onFinishFailed = (errorInfo: any) => {
        /*  console.log('Failed:', errorInfo); */
    };

    // 点击切换验证码
    toggleVerify = () => {
        this.setState((state) => ({
            imgSrc: '/api1/getCaptcha?d=' + Math.random(),
        }));
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
                            <Input placeholder='请输入用户名'/>
                        </Form.Item>

                        <Form.Item
                            name='password'
                            rules={[
                                {
                                    validator: this.validator,
                                },
                            ]}
                        >
                            <Input.Password placeholder='请输入密码'/>
                        </Form.Item>

                        <Form.Item
                            style={{float:'left', display:'inline'}}
                            name='captcha'
                            rules={[
                                {
                                    required: true,
                                    message: '请输入验证码',
                                },
                            ]}
                        >
                            <Input placeholder='请输入验证码'/>
                        </Form.Item>
                        <div style={{float:'left', display:'inline',marginLeft:'40px'}}>
                            <img
                                src={this.state.imgSrc}
                                alt='captcha'
                                onClick={this.toggleVerify}
                            ></img>
                        </div>
                        <Form.Item
                            {...this.tailLayout}
                            name='remember'
                            valuePropName='checked'
                            style={{clear:'both'}}
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <Form.Item {...this.tailLayout}>
                            <Button type='primary' htmlType='submit'>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        );
    }
}
export default withRouter(Login);
