import axios from 'axios';
axios.interceptors.request.use((config) => {
    console.log('interceptor calledd*');

    const token = localStorage.getItem('authenticated');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
}, (error) => {
    console.log(error);
});

export default axios;