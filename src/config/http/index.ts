import {AxiosRequestConfig} from 'axios';
import {API_BASE_URL} from 'config/consts';
import {Repository} from 'react3l/core';
import {requestInterceptor} from 'config/http/http.request.interceptor';
import {responseInterceptor} from 'config/http/http.response.interceptor';
import {errorInterceptor} from 'config/http/http.error.interceptor';

Repository.requestInterceptor = requestInterceptor;

Repository.responseInterceptor = responseInterceptor;

Repository.errorInterceptor = errorInterceptor;

export const httpConfig: AxiosRequestConfig = {
  withCredentials: false,
  baseURL: API_BASE_URL,
};