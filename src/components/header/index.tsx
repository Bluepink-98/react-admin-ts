import React from 'react';
import './index.css'
const Header = () => {
    return (
        <div className='header'>
            <div className='header-top'>
                <span>欢迎admin</span>
                <a href="javascript:">退出</a>
            </div>
            <div className='header-bottom'>
                <div className='header-bottom-left'>首页</div>
                <div className='header-bottom-right'>
                    <span></span>
                    <img src="" alt="" />
                    <span></span>
                </div>

            </div>
        </div>
    );
}

export default Header;
