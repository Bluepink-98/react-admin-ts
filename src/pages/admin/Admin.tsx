import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import memoryUtils from '../../utils/memory/memoryUtils';
import LeftNav from '../../components/left-nav';
import Header from '../../components/header'
import { Layout } from 'antd';

import Home from '../home/Home';
import Category from '../category/Category';
import Product from '../products/Product';
import Role from '../role/Role';
import User from '../user/User';
import Bar from '../charts/Bar';
import Line from '../charts/Line';
import Pie from '../charts/Pie';
import Order from '../order/Order'
const { Footer, Sider, Content } = Layout;
const Admin = () => {
  const user = memoryUtils.user;
  if (user === undefined) {
    return <Redirect to='/login'></Redirect>;
  }
  return (
    <Layout style={{ height: '100%' }}>
      <Sider>
        <LeftNav></LeftNav>
      </Sider>
      <Layout>
        <Header></Header>
        <Content style={{backgroundColor:'#fff', margin:20}}>
          <Switch>
            <Redirect from='/' exact to='/home'/> 
            <Route path='/home' component={Home}></Route>
            <Route path='/Category' component={Category}></Route>
            <Route path='/Product' component={Product}></Route>
            <Route path='/Role' component={Role}></Route>
            <Route path='/User' component={User}></Route>
            <Route path='/charts/Bar' component={Bar}></Route>
            <Route path='/charts/Line' component={Line}></Route>
            <Route path='/charts/Pie' component={Pie}></Route>
            <Route path='/order' component={Order}></Route> 
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
