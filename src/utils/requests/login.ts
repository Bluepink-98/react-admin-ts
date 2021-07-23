import axios from '../axios/Axios';

export const signIn = (data: any) => {
    return axios.post('/api1/login', data);
};

export const getCaptcha = () => {
    return axios.get('/api1/getCaptcha');
};
