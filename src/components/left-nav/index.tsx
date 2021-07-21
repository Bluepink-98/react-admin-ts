import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './index.css';
import menuList from '../../config/menuConfig';

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

  const getMenuList = (menuList: any) => {
    return menuList.map((item: any) => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key} icon={<item.icon />}>
            <Link to={item.key}>item.title</Link>
          </Menu.Item>
        );
      } else {
        return (
          <SubMenu key={item.key} icon={<item.icon />} title={item.title}>
            {getMenuList(item.children)}
          </SubMenu>
        );
      }
    });
  };
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
          {getMenuList(menuList)}
        </Menu>
      </div>
    </div>
  );
};

export default LeftNav;
