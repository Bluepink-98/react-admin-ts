import axios from 'axios';

declare module 'axios' {
    export interface IAxiosResponse<T = any> extends Promise<T> {}
}

declare module 'axios' {
    interface IAxiosInstance {
        (config: AxiosRequestConfig): Promise<any>;
    }
}

const axiosService = axios.create({
    baseURL: 'http://localhost:3001',
    // timeout: CONN_TIMEOUT,
    // adapter: AxiosCacheAdapter,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
    },
});

axiosService.defaults.responseType = 'json';
// axiosService.defaults.isRetryRequest = false
axiosService.interceptors.request.use(
    async (config) => {
        return config;
    },
    (err) => Promise.reject(err)
);

axiosService.interceptors.response.use(
    (response) => {
        if (response.status === 200) {
            return response.data;
        }
    },
    (err) => Promise.reject(err)
);

export default axiosService;
