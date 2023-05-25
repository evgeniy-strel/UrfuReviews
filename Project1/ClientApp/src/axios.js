import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://localhost:44495/',
  headers: {
    Authorization: 'Bearer ' + window.localStorage.getItem('token'),
    timeout: 5000,
  },
});

export default instance;
