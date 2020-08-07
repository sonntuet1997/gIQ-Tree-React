import {RouteConfig} from 'react-router-config';
import {LOGIN_ROUTE} from 'config/route-consts';
import LoginView from 'views/LoginView/LoginView';
import {translate} from 'react3l/helpers/i18n';
import App from 'views/App/App';
import GenerateTree from "views/GenerateTree/GenerateTree";
import {WebSocketDemo} from "../views/Test/Test";
import React from "react";
import {BranchesOutlined, ExperimentOutlined, HomeOutlined} from '@ant-design/icons';

export const routes: RouteConfig[] = [
    {
        name: translate('routes.login'),
        path: LOGIN_ROUTE,
        component: LoginView,
        display: false,
    },
    {
        name: translate('routes.home'),
        path: '/',
        component: App,
        display: true,
        routes: [
            {
                name: translate('routes.home'),
                path: '.',
                routes: [],
                icon: <HomeOutlined/>,
                exact: true,
                display: true
            },
            {
                name: translate('routes.generateTree'),
                path: '/generateTree',
                component: GenerateTree,
                routes: [],
                icon: <BranchesOutlined/>,
                display: true
            },
            {
                name: translate('routes.testtest'),
                path: '/test',
                icon: <ExperimentOutlined/>,
                routes: [
                    {
                        name: translate('routes.generateTreetest'),
                        path: '/generateTree',
                        component: GenerateTree,
                        routes: [],
                        icon: <ExperimentOutlined/>,
                        display: true
                    }, {
                        name: translate('routes.tasdestestt'),
                        path: '/test',
                        routes: [],
                        icon: <ExperimentOutlined/>,
                        display: true
                    }],
                display: true
            }],
    }
];
