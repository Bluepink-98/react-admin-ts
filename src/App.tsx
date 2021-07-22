import React from 'react';
import Login from './pages/login/Login';
import Admin from './pages/admin/Admin';
import 'antd/dist/antd.css';
import './assets/iconfont/iconfont.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
export default class App extends React.Component {
    public render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/' component={Admin}></Route>
                </Switch>
            </BrowserRouter>
        );
    }
}
