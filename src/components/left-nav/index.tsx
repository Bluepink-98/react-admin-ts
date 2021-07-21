import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './index.css';

import { Menu, Button } from 'antd';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;
const LeftNav = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className='left-nav'>
            <Link to='/' className='left-nav-header'>
                <img src={logo} alt='' />
                <h1>后台管理</h1>
            </Link>
            <div style={{ width: '100%' }}>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode='inline'
                    theme='dark'
                    inlineCollapsed={collapsed}
                >
                    <Menu.Item key='1' icon={<PieChartOutlined />}>
                        首页
                    </Menu.Item>
                    <SubMenu key='sub1' icon={<MailOutlined />} title='商品'>
                        <Menu.Item key='3'>Option</Menu.Item>
                        <Menu.Item key='4'>Option</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        </div>
    );
};

export default LeftNav;
