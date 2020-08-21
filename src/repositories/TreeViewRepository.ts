import {Repository} from 'react3l/core';
import {httpConfig} from 'config/http';
import {API_BASE_URL} from 'config/consts';
import {url} from 'react3l/helpers/path';
import {API_TREE_VIEW} from 'config/api-consts';
import nameof from 'ts-nameof.macro';
import {kebabCase} from 'react3l/helpers';
import {map} from 'rxjs/operators';
import {AxiosResponse} from 'axios';
import {Observable} from "rxjs";
import {Log} from "../models/Log";

export type AuthTokenResponse = { accessToken: string; refreshToken: string };

export class TreeViewRepository extends Repository {
    constructor() {
        super(httpConfig);
        console.log(this.baseURL);
        this.baseURL = url(API_BASE_URL, API_TREE_VIEW);
        console.log(this.baseURL);
    }


    // public getAll(): Observable<Log[]> {
    //     return this.httpObservable.get(kebabCase(nameof(this.getAll)))
    //         .pipe(map((response: AxiosResponse) => response.data));
    // }

    public get(url: string): Observable<any> {
        return this.httpObservable.get(url)
            .pipe(map((response: AxiosResponse) => response.data));
    }
}

export const _TreeViewRepository: TreeViewRepository = new TreeViewRepository();
