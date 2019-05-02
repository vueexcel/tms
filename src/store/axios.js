import axios from "axios";
// axios.defaults.baseURL = 'http://5.9.144.226:8000';
// axios.defaults.baseURL = 'https://pure-wave-45439.herokuapp.com';
<<<<<<< HEAD
axios.defaults.baseURL = 'https://agile-hamlet-51923.herokuapp.com';

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('authenticated');
=======
axios.defaults.baseURL = "https://agile-hamlet-51923.herokuapp.com";
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem("authenticated");
>>>>>>> c980eb86c8aeb4a7cfb1f0e5b68030aac43bc188
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.log(error);
  }
);

export default axios;
