import React from 'react';
import './index.css'
const Header = () => {
    return (
        <div className='header'>
            <div className='header-top'>
                <span>欢迎admin</span>
                <a href="javascript:">退出</a>
            </div>
            <div className='header-bottom'></div>
        </div>
    );
}

export default Header;
