import axios from 'axios';

const royaleToken = process.env.CLASH_TOKEN;

const api = axios.create({
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'authorization': `Bearer ${royaleToken}`
  },
  baseURL: 'https://api.clashroyale.com/v1'
});

export default api;