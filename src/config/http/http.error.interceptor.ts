import {AxiosError} from 'axios';
import {authService} from 'services/auth-service';

export async function errorInterceptor(error: AxiosError) {
    if (error?.response?.status) {
        switch (error.response.status) {
            case 401:
                await authService.removeCredentials();
                break;
            case 404:
                throw new Error("700");
            default:
                // do nothing
                break;
        }
        throw new Error(JSON.stringify(error.response.data));
    }
    return error;
}
