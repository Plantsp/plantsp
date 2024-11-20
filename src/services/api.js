import axios from 'axios';

// URL da API
const api = axios.create({
    //baseURL: 'http://localhost:22065/api/',
    baseURL:"https://api-plantsp.runasp.net/api/"
});

export default api;