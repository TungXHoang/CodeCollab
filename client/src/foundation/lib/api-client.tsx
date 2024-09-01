import Axios, { InternalAxiosRequestConfig } from 'axios';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json';
  }

  config.withCredentials = true;
  return config;
}

export const api = Axios.create({
  baseURL: `${import.meta.env.VITE_CLIENT_BASEURL}`
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
	(response) => {
		return response
  },
	(error) => {
    const message = error.response?.data?.message || error.message;

    return Promise.reject(error);
  },
);