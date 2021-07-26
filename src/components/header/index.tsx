import React, { useState, useEffect } from 'react';
import { useLocation, useHistory, withRouter } from 'react-router-dom';
import { message, Modal, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import menuList from '../../config/menuConfig';
import memoryUtils from '../../utils/memory/memoryUtils';
import storageUtils from '../../utils/memory/storageUtils';
import { getWeather } from '../../utils/requests/login';
import { formateDate } from '../../utils/memory/dateUtils';
import LinkButton from '../link-button/index';
// import { useMedia } from 'react-use';

import './index.css';

const Header = () => {
    // const isMobile = useMedia('(max-width: 767px)');
    const [currentTime, setCurrentTime] = useState(formateDate(Date.now()));
    const [weather, setWeather] = useState('');
    const [city, setCity] = useState('');
    const [title, setTitle] = useState('');

    const pathname = useLocation();
    const history = useHistory();
    const getWeatherData = async () => {
        const result: any = await getWeather();
        if (result.status === '1') {
            const { city, weather } = result.lives[0];
            setWeather(weather);
            setCity(city);
        } else {
            message.error('获取天气失败');
        }
    };

    const getTitle = () => {
        // 得到当前请求路径
        const path: string = pathname.pathname;
        let _title = '';
        menuList.forEach((item) => {
            if (item.key === path) {
                // 如果当前item对象的key与path一样,item的title就是需要显示的title
                _title = item.title;
                setTitle(_title);
            } else if (item.children) {
                // 在所有子item中查找匹配的
                const cItem = item.children.find(
                    (cItem) => path.indexOf(cItem.key) === 0
                );
                // 如果有值才说明有匹配的
                if (cItem) {
                    // 取出它的title
                    _title = cItem.title;
                    setTitle(_title);
                }
            }
        });
    };
    const logoOut = () => {
        Modal.confirm({
            title: '退出登录',
            icon: <ExclamationCircleOutlined />,
            content: '确认是否退出登录',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                storageUtils.removeUser();
                memoryUtils.user = undefined;
                history.replace('/login');
                /* window.location.href = '/login'; */
            },
        });
    };

    useEffect(() => {
        getTitle();
    }, [pathname]);

    useEffect(() => {
        const timer = setInterval(() => {
            const currentTime = formateDate(Date.now());
            setCurrentTime(currentTime);
        }, 1000);
        getWeatherData();
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className='header'>
            <div className='header-top'>
                <span>欢迎admin</span>
                <LinkButton onClick={logoOut}>退出</LinkButton>
            </div>
            <div className='header-bottom'>
                <div className='header-bottom-left'>{title}</div>
                <div className='header-bottom-right'>
                    <Space>
                        <span>{currentTime}</span>
                        <span>{city}</span>
                        <span>{weather}</span>
                    </Space>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Header);
