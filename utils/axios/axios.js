import axios from 'axios';

const axiosServices = axios.create({ baseURL: "http://127.0.0.1:8000/api/" });
// const axiosAuthService = axios.create({baseURL: process.env.REACT_APP_BACKEND_AUTH_API_URL});

axiosServices.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject((error.response && error.response.data) || 'Wrong Services');
    }
  );

export default axiosServices;
export {axiosServices};
