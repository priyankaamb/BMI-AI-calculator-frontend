import axios from 'axios';
// import store from '@/store/Index.js';
const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
//   baseURL: `${process.env.VUE_APP_API_URL}/api`, 
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
    // const token = store.getters['auth/getToken'];
    
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default apiClient;

