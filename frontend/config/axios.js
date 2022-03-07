const env = process.env.NODE_ENV || 'development';

import axios from 'axios';

let client = axios;
if (env == 'development') {
  client = axios.create({
    baseURL: 'https://philosophers-v3-api.herokuapp.com/',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
    },
    timeout: 2000
  });
}

export default client;