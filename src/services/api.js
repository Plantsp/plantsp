import axios from 'axios';

// URL da API
const api = axios.create({
    baseURL: 'http://localhost:23678/api/'
});

export default api;