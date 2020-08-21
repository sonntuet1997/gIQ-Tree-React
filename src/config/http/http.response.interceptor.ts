import {AxiosResponse} from 'axios';
import {deserialize} from 'react3l/helpers';

export function responseInterceptor(response: AxiosResponse) {
    if (typeof response.data === 'object' && response.data !== null) {
        if(response.data instanceof Blob) {}
        else {response.data = deserialize(response.data);}
            // console.log(response.data);
        // response.data = transformKeys(response.data, 'camelCase');

    }
    return response;
}
