import { userActions } from '../features/user/userSlice';
import { store } from 'app/store';
import axios, {  AxiosRequestConfig, AxiosResponse } from 'axios';
import jwt_decode from "jwt-decode";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL_LOCAL || process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isCancelled = false

// Add a request interceptor
axiosClient.interceptors.request.use(
  async function (config: AxiosRequestConfig) {
    const token: string = await localStorage.getItem('access_token') || ''
    if (token) {
      let decodedToken: any = jwt_decode(token);
      let currentDate = new Date();
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        if (!isCancelled) {
          store.dispatch(userActions.logout('Your session is expired'))
          isCancelled = true
        }
        throw new axios.Cancel('Your session is expired');
      }

      isCancelled = false
      config.headers!.Authorization = `Bearer ${token}`;
    }
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);


// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;