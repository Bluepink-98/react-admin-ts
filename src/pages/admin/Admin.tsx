import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import memoryUtils from '../../utils/memory/memoryUtils';
import LeftNav from '../../components/left-nav';
import { Layout } from 'antd';

import menuList from '../../config/menuConfig';
import Home from '../home/Home';
import Category from '../category/Category';
import Product from '../product/Product';
import Role from '../role/Role';
import User from '../user/User';
import Bar from '../charts/Bar';
import Line from '../charts/Line';
import Pie from '../charts/Pie';

const { Header, Footer, Sider, Content } = Layout;
const Admin = () => {
  const user = memoryUtils.user;
  console.log(user);

  if (user === undefined) {
    return <Redirect to='/login'></Redirect>;
  }
  return (
    <Layout style={{ height: '100%' }}>
      <Sider>
        <LeftNav></LeftNav>
      </Sider>
      <Layout>
        <Header style={{backgroundColor:'#fff'}}>Header</Header>
        <Content>
          <Switch>
            <Route path='/home' component={Home}></Route>
            <Route path='/Category' component={Category}></Route>
            <Route path='/Product' component={Product}></Route>
            <Route path='/Role' component={Role}></Route>
            <Route path='/User' component={User}></Route>
            <Route path='/Bar' component={Bar}></Route>
            <Route path='/Line' component={Line}></Route>
            <Route path='/Pie' component={Pie}></Route>
            <Redirect to='/home'></Redirect>
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center', color: '#ccc' }}>
          推荐使用谷歌浏览器打开网页，效果更好
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Admin;
