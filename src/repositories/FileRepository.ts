import {Repository} from 'react3l/core';
import {httpConfig} from 'config/http';
import {API_BASE_URL} from 'config/consts';
import {url} from 'react3l/helpers/path';
import {API_FILE, API_RESULT_VIEW} from 'config/api-consts';
import nameof from 'ts-nameof.macro';
import {kebabCase} from 'react3l/helpers';
import {map} from 'rxjs/operators';
import {AxiosResponse} from 'axios';
import {Observable} from "rxjs";
import {Log} from "../models/Log";

export type AuthTokenResponse = { accessToken: string; refreshToken: string };

export class FileRepository extends Repository {
    constructor() {
        super(httpConfig);
        console.log(this.baseURL);
        this.baseURL = url(API_BASE_URL, API_FILE);
        console.log(this.baseURL);
    }


    public getAll(): Observable<Log[]> {
        return this.httpObservable.get(kebabCase(nameof(this.getAll)))
            .pipe(map((response: AxiosResponse) => response.data));
    }

    public zip(url: string): Observable<any> {
        return this.httpObservable.get(kebabCase(nameof(this.zip)) + '/' + url,{
            responseType: 'blob',
        })
            // .pipe(map((response: AxiosResponse<Blob>) => response.data));
    }
}

export const _FileRepository: FileRepository = new FileRepository();
