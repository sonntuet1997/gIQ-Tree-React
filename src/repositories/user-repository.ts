import {Repository} from 'react3l/core';
import {httpConfig} from 'config/http';
import {kebabCase, url} from 'react3l/helpers';
import {API_BASE_URL} from 'config/consts';
import {API_USER_ROUTE} from 'config/api-consts';
import {Observable} from 'rxjs';
import {User} from 'models/User';
import nameof from 'ts-nameof.macro';
import {map} from 'rxjs/operators';
import {AxiosResponse} from 'axios';

export class UserRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.baseURL = url(API_BASE_URL, API_USER_ROUTE);
  }

  public current(): Observable<User> {
    return this.httpObservable.get<User>(kebabCase(nameof(this.current)))
      .pipe(
        map((response: AxiosResponse<User>) => response.data),
      );
  }
}

export const userRepository: UserRepository = new UserRepository();
