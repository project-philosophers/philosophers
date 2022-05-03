const env = process.env.NODE_ENV || 'development';
const isLocal = import.meta.env.VITE_IS_LOCAL || false;

import axios from 'axios';

let client = axios;
if (isLocal) {
  console.log('local');
  client = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 2000
  });
} else {
  console.log('remote');
  client = axios.create({
    baseURL: 'https://philosophers-v3-api.herokuapp.com/',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
    },
    timeout: 2000
  })
}

export default client;