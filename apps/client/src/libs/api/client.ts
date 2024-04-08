import axios, { isAxiosError } from 'axios';
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ApiException, CustomException, errorMessage } from '../exceptions';
import type { ApiErrorScheme } from '../exceptions';
import { Storage } from './storage';
import { LOCAL_STORAGE_KEY } from '@/constants/storage';
import { isProd } from '@/utils/isProd';

const DEVELOPMENT_API_URL = process.env.NEXT_PUBLIC_BASE_URL;
const PRODUCTION_API_URL = process.env.NEXT_PUBLIC_BASE_URL;

const instance = axios.create({
  baseURL: isProd(process.env.NODE_ENV) ? PRODUCTION_API_URL : DEVELOPMENT_API_URL,
  timeout: 15000,
});

const interceptorRequestFulfilled = (config: InternalAxiosRequestConfig) => {
  if (typeof window === 'undefined') {
    return config;
  }

  if (!config.headers) {
    return config;
  }

  const accessToken = Storage.getItem(LOCAL_STORAGE_KEY.accessToken);
  if (!accessToken) {
    return config;
  }

  config.headers.Authorization = accessToken;

  return config;
};

instance.interceptors.request.use(interceptorRequestFulfilled);

const interceptorResponseFulfilled = (res: AxiosResponse) => {
  if (200 <= res.status && res.status < 300) {
    return res.data;
  }

  return Promise.reject(res.data);
};

let isRefreshingToken = false;
let tokenRefreshPromise: Promise<{ accessToken: string; refreshToken: string }> | null =
  null;

const interceptorResponseRejected = async (error: AxiosError<ApiErrorScheme>) => {
  if (error.response?.data?.['response_messages']) {
    return Promise.reject(new ApiException(error.response.data, error.response.status));
  }

  if (error.message.startsWith('timeout')) {
    return Promise.reject(new CustomException(errorMessage.TIMEOUT, 'NETWORK_TIMEOUT'));
  }

  if (isAxiosError(error)) {
    if (error.response?.status === 403) {
      if (!isRefreshingToken) {
        isRefreshingToken = true;

        try {
          const refreshToken = Storage.getItem(LOCAL_STORAGE_KEY.refreshToken);
          tokenRefreshPromise = post<{ accessToken: string; refreshToken: string }>(
            '/auth/refresh',
            {
              refreshToken,
            }
          );

          const response = await tokenRefreshPromise;

          Storage.setItem(
            LOCAL_STORAGE_KEY.accessToken,
            `Bearer ${response.accessToken}`
          );
          Storage.setItem(
            LOCAL_STORAGE_KEY.refreshToken,
            `Bearer ${response.refreshToken}`
          );
        } catch (error) {
          console.error(error);
        } finally {
          isRefreshingToken = false;
          tokenRefreshPromise = null;
        }
      } else {
        await tokenRefreshPromise;
      }

      return instance(error.config);
    }
  }

  return Promise.reject(new CustomException(errorMessage.UNKNOWN_400, 'NETWORK_ERROR'));
};

instance.interceptors.response.use(
  interceptorResponseFulfilled,
  interceptorResponseRejected
);

export const get = <T>(...args: Parameters<typeof instance.get>) => {
  return instance.get<T, T>(...args);
};

export const post = <T>(...args: Parameters<typeof instance.post>) => {
  return instance.post<T, T>(...args);
};

export const put = <T>(...args: Parameters<typeof instance.put>) => {
  return instance.put<T, T>(...args);
};

export const patch = <T>(...args: Parameters<typeof instance.patch>) => {
  return instance.patch<T, T>(...args);
};

export const del = <T>(...args: Parameters<typeof instance.delete>) => {
  return instance.delete<T, T>(...args);
};
