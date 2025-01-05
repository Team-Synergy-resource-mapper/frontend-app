import axios from 'axios';

const axiosServices = axios.create({ baseURL: process.env.REACT_APP_BACKEND_API_URL });
// const axiosAuthService = axios.create({baseURL: process.env.REACT_APP_BACKEND_AUTH_API_URL});

axiosServices.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject((error.response && error.response.data) || 'Wrong Services');
    }
  );

export default axiosServices;
export {axiosServices};