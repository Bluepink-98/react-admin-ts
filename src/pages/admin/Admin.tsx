import React from 'react';
import { Redirect } from 'react-router';
import memoryUtils from '../../utils/memory/memoryUtils';
import LeftNav from '../../components/left-nav'
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;
const Admin = () => {
    const user = memoryUtils.user;
    console.log(user);

    if (user === undefined) {
        return <Redirect to='/login'></Redirect>;
    }
    return (
        <Layout style={{ height: '100%'}}>
            <Sider>
                <LeftNav></LeftNav>
            </Sider>
            <Layout>
                <Header> </Header>
                <Content>Content</Content>
                <Footer style={{textAlign:'center',color:'#ccc'}}>推荐使用谷歌浏览器打开网页，效果更好</Footer>
            </Layout>  
        </Layout>
        
    );
};

export default Admin;
