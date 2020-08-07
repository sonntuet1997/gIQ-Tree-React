import {AxiosError} from 'axios';
import {authService} from 'services/auth-service';

export async function errorInterceptor(error: AxiosError) {
  if (error?.response?.status) {
    switch (error.response.status) {
      case 401:
        await authService.removeCredentials();
        break;

      default:
        // do nothing
        break;
    }
  }
  return error;
}
