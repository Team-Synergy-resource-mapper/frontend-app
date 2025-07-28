import axios from 'axios';


const axiosServices = axios.create({ baseURL: "https://sincere-oriented-salmon.ngrok-free.app/" });
// const axiosAuthService = axios.create({baseURL: process.env.REACT_APP_BACKEND_AUTH_API_URL});
const axiosMLService = axios.create({ baseURL: "https://sincere-oriented-salmon.ngrok-free.app/" });

axiosServices.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject((error.response && error.response.data) || 'Wrong Services');
    }
  );

axiosMLService.interceptors.response.use(
  (response) => response,
  (error)=> {
      return Promise.reject((error.response && error.response.data) || 'Wrong Services');
    }
)  
export default axiosServices;
export {axiosServices, axiosMLService};
