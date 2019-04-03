import axios from 'axios' 

axios.defaults.headers.common = {
    "Content-Type": 'application/json',
    "Authorization": 'Bearer ' + localStorage.getItem('authenticated'),
};

export default axios;