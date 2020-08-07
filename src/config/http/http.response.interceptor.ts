import {AxiosResponse} from 'axios';
import {transformKeys} from 'react3l/helpers/naming-convention';
import {deserialize} from 'react3l/helpers';

export function responseInterceptor(response: AxiosResponse) {
  if (typeof response.data === 'object' && response.data !== null) {
    response.data = transformKeys(response.data, 'camelCase');
    response.data = deserialize(response.data);
  }
  return response;
}
