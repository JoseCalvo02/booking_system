import axios from 'axios';

const baseURL = 'http://localhost:3000'; // Puerto del backend

const axiosInstance = axios.create({
    baseURL
});

export default axiosInstance;