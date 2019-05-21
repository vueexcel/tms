import axios from "axios";
// axios.defaults.baseURL = 'http://5.9.144.226:8000';
// axios.defaults.baseURL = 'https://pure-wave-45439.herokuapp.com';
// axios.defaults.baseURL = "https://agile-hamlet-51923.herokuapp.com";
//http://176.9.137.77:8000
axios.defaults.baseURL = process.env.VUE_APP_ROOT_API
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem("authenticated");
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
