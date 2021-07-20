import React from 'react';
import { Redirect } from 'react-router';
import memory from '../../utils/memory/memory';
const Admin = () => {
    const user = memory.user;
    if (user.id === ' ') {
        return <Redirect to='/login'></Redirect>;
    }
    return (
        <div>
            <h1> hello {user.username}</h1>
        </div>
    );
};

export default Admin;
