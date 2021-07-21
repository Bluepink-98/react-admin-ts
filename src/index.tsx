import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import storageUtils from './utils/memory/storageUtils'
import memoryUtils from './utils/memory/memoryUtils'


const user= storageUtils.getUser();
memoryUtils.user = user

ReactDOM.render(<App />, document.getElementById('root'));
