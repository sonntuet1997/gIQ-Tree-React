import {Repository} from 'react3l/core';
import {httpConfig} from 'config/http';
import {API_BASE_URL} from 'config/consts';
import {url} from 'react3l/helpers/path';
import {API_GENERATE_TREE_ROUTE} from 'config/api-consts';
import nameof from 'ts-nameof.macro';
import {kebabCase} from 'react3l/helpers';
import {map} from 'rxjs/operators';
import {AxiosResponse} from 'axios';
import {Observable} from "rxjs";

export type AuthTokenResponse = { accessToken: string; refreshToken: string };

export class GenerateTreeRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(API_BASE_URL, API_GENERATE_TREE_ROUTE);
    }


    public startGenerate(data: any): Observable<any> {
        return this.httpObservable.post(kebabCase(nameof(this.startGenerate)), data)
            .pipe(map((response: AxiosResponse) => response.data));
    }
}

export const _GenerateTreeRepository: GenerateTreeRepository = new GenerateTreeRepository();
