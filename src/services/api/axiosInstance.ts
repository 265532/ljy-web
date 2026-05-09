import axios, { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ApiError } from './types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://81.71.129.36:8010';

export const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('access_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retryCount?: number };

      if (error.response?.status === 401 && originalRequest && !originalRequest._retryCount) {
        originalRequest._retryCount = 0;
      }

      if (error.response?.status === 401) {
        localStorage.removeItem('access_token');
        window.location.href = '/login';
      }

      const apiError: ApiError = {
        code: error.response?.status || -1,
        message: extractErrorMessage(error),
        url: error.config?.url,
        requestData: error.config?.data,
      };

      return Promise.reject(apiError);
    }
  );

  return instance;
};

const extractErrorMessage = (error: AxiosError): string => {
  if (error.response?.data && typeof error.response.data === 'object') {
    const data = error.response.data as Record<string, unknown>;
    if (data.detail) {
      return String(data.detail);
    }
    if (data.message) {
      return String(data.message);
    }
  }

  if (error.message.includes('timeout')) {
    return '请求超时，请稍后重试';
  }

  if (error.message.includes('Network Error')) {
    return '网络连接失败，请检查您的网络设置';
  }

  return '请求失败，请稍后重试';
};

export const axiosInstance = createAxiosInstance();
