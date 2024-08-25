import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001/api/',
});
instance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);
export default instance;
