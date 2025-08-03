import axios from 'axios';
import { API_URL } from '../../config'

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('userInfo');
    console.log(user)
    const token = JSON.parse(user || '{}');
    console.log(token)

    //const tokenn = useSelector(state => state.userInfo.token)
    if (token) {
      console.log(token, "token");
      config.headers.Authorization = `Bearer ${token.access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optionally handle global errors
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login'; // Optionally redirect
    }
    return Promise.reject(error);
  }
);

export default api