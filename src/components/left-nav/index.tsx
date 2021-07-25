import React, { useState, useRef, Component } from 'react';
import { withRouter } from 'react-router';
import { Link, RouteComponentProps } from 'react-router-dom';

import logo from '../../assets/images/logo.png';
import './index.css';

import menuList from '../../config/menuConfig';
import { IMenu } from '../../modules/common';

import { Menu } from 'antd';

const { SubMenu } = Menu;
class LeftNav extends Component<RouteComponentProps> {
    menuNodes: JSX.Element[] = [];
    openKey = '';
    constructor(props: any) {
        super(props);
        this.menuNodes = this.getMenuList(menuList);
        this.getOpenKey(menuList);
    }

    getOpenKey = (menuList: Array<IMenu>) => {
        const path = this.props.location.pathname;
        return menuList.map((item: IMenu) => {
            if (item.children) {
                const cItem = item.children.find((cItem) => {
                    return cItem.key === path;
                });
                if (cItem) {
                    this.openKey = item.key;
                }
            }
        });
    };
    getMenuList = (_menuList: Array<IMenu>) => {
        return _menuList.map((item: IMenu) => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <span className={`iconfont ${item.icon}`}></span>
                        <Link to={item.key}>{item.title}</Link>
                    </Menu.Item>
                );
            } else {
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
                        {this.getMenuList(item.children)}
                    </SubMenu>
                );
            }
        });
    };
    render() {
        let path = this.props.location.pathname;
        if (path.indexOf('/product') === 0) {
            path = '/product';
        }
        return (
            <div className='left-nav'>
                <Link to='/' className='left-nav-header'>
                    <img src={logo} alt='' />
                    <h1>后台管理</h1>
                </Link>
                <div style={{ width: '100%' }}>
                    <Menu
                        selectedKeys={[path]}
                        defaultOpenKeys={[this.openKey]}
                        mode='inline'
                        theme='dark'
                    >
                        {this.menuNodes}
                    </Menu>
                </div>
            </div>
        );
    }
}

export default withRouter(LeftNav);
