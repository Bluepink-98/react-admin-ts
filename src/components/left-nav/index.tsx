import React, { useState, useRef } from 'react';
import { withRouter } from 'react-router';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../assets/images/logo.png';
import './index.css';

import menuList from '../../config/menuConfig';
import { IMenu } from '../../modules/common';

import { Menu } from 'antd';

const { SubMenu } = Menu;
const LeftNav = () => {
    const location = useLocation();
    const [openkey, setOpenKey] = useState('');
   /*  const getOpenKey = (menuList: Array<IMenu>) => {
        return menuList.map((item: IMenu) => {
            if (item.children) {
                const cItem = item.children.find(
                    (cItem) => location.pathname.indexOf(cItem.key) === 0
                );
                if (cItem) {
                    setOpenKey(item.key);
                }
            }
        });
    }; */

    const getMenuList = (_menuList: Array<IMenu>) => {
        return _menuList.map((item: IMenu) => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <span className={`iconfont ${item.icon}`}></span>
                        <Link to={item.key}>{item.title}</Link>
                    </Menu.Item>
                );
            } else {
                /*  const cItem = item.children.find((cItem) => {
                    return cItem.key === location.pathname;
                });
                if (cItem) {
                    openkey=item.key;
                } */
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <>
                                <span
                                    className={`iconfont ${item.icon}`}
                                ></span>
                                {item.title}
                            </>
                        }
                    >
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
                    selectedKeys={[location.pathname]}
                    defaultOpenKeys={[openkey]}
                    mode='inline'
                    theme='dark'
                >
                    {getMenuList(menuList)}
                </Menu>
            </div>
        </div>
    );
};

export default withRouter(LeftNav);
