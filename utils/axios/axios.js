import axios from 'axios';

const axiosServices = axios.create({ baseURL: "https://sincere-oriented-salmon.ngrok-free.app/" });
const axiosMLService = axios.create({ baseURL: "https://sincere-oriented-salmon.ngrok-free.app/" });

// Add the header to all requests for axiosServices
axiosServices.interceptors.request.use(config => {
  config.headers['ngrok-skip-browser-warning'] = 'true';
  return config;
});

// Add the header to all requests for axiosMLService
axiosMLService.interceptors.request.use(config => {
  config.headers['ngrok-skip-browser-warning'] = 'true';
  return config;
});

axiosServices.interceptors.response.use(
  response => response,
  error => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

axiosMLService.interceptors.response.use(
  response => response,
  error => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

export default axiosServices;
export { axiosServices, axiosMLService };