import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const BASE_URL = 'https://15.ecmascript.pages.academy/big-trip/';
const TIME_OUT = 5000;
const AUTHORIZATION = 'Basic .......';

export const createAPI = ():AxiosInstance => {
  const api = axios.create({baseURL: BASE_URL, timeout: TIME_OUT});

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      config.headers['Authorization'] = AUTHORIZATION;
      return config;
    },
  );
  return api;
};
