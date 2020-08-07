import {Repository} from 'react3l/core';
import {httpConfig} from 'config/http';
import {API_BASE_URL} from 'config/consts';
import {url} from 'react3l/helpers/path';
import {API_AUTH_LOGIN_GOOGLE_ROUTE, API_AUTH_ROUTE} from 'config/api-consts';
import nameof from 'ts-nameof.macro';
import {kebabCase} from 'react3l/helpers';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AxiosResponse} from 'axios';

export type AuthTokenResponse = { accessToken: string; refreshToken: string };

export class AuthRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.baseURL = url(API_BASE_URL, API_AUTH_ROUTE);
  }

  public accessToken<T = { accessToken: string; refreshToken: string }>(): Observable<T> {
    return this.httpObservable.post<T>(kebabCase(nameof(this.accessToken)), {})
        .pipe(map((response: AxiosResponse<T>) => response.data));
  }

  public loginGoogle(tokenId: string): Observable<AuthTokenResponse> {
    return this.httpObservable.post<AuthTokenResponse>(API_AUTH_LOGIN_GOOGLE_ROUTE, {tokenId})
        .pipe(map((response: AxiosResponse<AuthTokenResponse>) => response.data));
  }
}

export const authRepository: AuthRepository = new AuthRepository();
