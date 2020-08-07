import {AxiosRequestConfig} from 'axios';
import {transformKeys} from 'react3l/helpers/naming-convention';
import {serialize} from 'react3l/helpers';
import nameof from 'ts-nameof.macro';
import initialGlobalState from 'config/global-state';

export function requestInterceptor(config: AxiosRequestConfig) {
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
    return config;
  }
  config.headers['Content-Type'] = 'multipart/form-data';
  // const accessToken: string | null = localStorage.getItem(nameof(initialGlobalState.accessToken));
  // if (accessToken) {
  //   if (!config.headers['Authorization']) {
  //     config.headers.Authorization = `Bearer ${accessToken}`;
  //   }
  // }
  // if (typeof config.data === 'object' && config.data !== null) {
  //   config.data = transformKeys(config.data, 'camelCase');
  //   config.data = serialize(config.data);
  // }
  return config;
}
