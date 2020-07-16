import axios from "axios";
axios.defaults.baseURL = process.env.VUE_APP_ROOT_API
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem("authenticated")
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
