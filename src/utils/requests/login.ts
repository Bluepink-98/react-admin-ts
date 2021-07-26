import axios from '../axios/Axios';

export const signIn = (data: any) => {
    return axios.post('/api1/login', data);
};

export const getCaptcha = () => {
    return axios.get('/api1/getCaptcha');
};

export const getWeather = () => {
    return axios.get(
        'https://restapi.amap.com/v3/weather/weatherInfo?city=西安市&key=46445ab41613f2c469d975d9873c11cd1'
    );
};
