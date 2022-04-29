const env = process.env.NODE_ENV || 'development';
// const isLocal = process.env.IS_LOCAL || false;
const isLocal = import.meta.env.IS_LOCAL || false;
console.log(isLocal)

import axios from 'axios';
// import log from '../../backend/lib/log';

let client = axios;
// if (env == 'development') {
if (isLocal) {
  client = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
      // "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      // "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
    },
    timeout: 2000
  });
} else {
  client = axios.create({
    baseURL: 'https://philosophers-v3-api.herokuapp.com/',
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 2000
  })
}

export default client;