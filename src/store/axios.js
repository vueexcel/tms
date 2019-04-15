import axios from 'axios';
axios.defaults.baseURL = 'http://5.9.144.226:8000';
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('authenticated');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    console.log(error);
});

export default axios;