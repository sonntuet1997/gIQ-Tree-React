import {RouteConfig} from 'react-router-config';
import {LOGIN_ROUTE} from 'config/route-consts';
import LoginView from 'views/LoginView/LoginView';
import App from 'views/App/App';
import GenerateTree from "views/GenerateTree/GenerateTree";
import React from "react";
import {AreaChartOutlined, BranchesOutlined, ExperimentOutlined, HomeOutlined} from '@ant-design/icons';
import TreeView from "../views/TreeView/TreeView";
import {translate} from "react3l/helpers";
import Test from "../views/Test/Test";

export const routes: RouteConfig[] = [
    {
        name: "Login",
        path: LOGIN_ROUTE,
        component: LoginView,
        display: false,
    },
    {
        name: "Home",
        path: '/',
        component: App,
        display: true,
        routes: [
            {
                name: "Home",
                path: '.',
                routes: [],
                icon: <HomeOutlined/>,
                exact: true,
                display: true
            },
            {
                name: "Generate Tree",
                path: '/generateTree',
                component: GenerateTree,
                routes: [],
                icon: <BranchesOutlined/>,
                display: true
            },
            {
                name: "Tree",
                path: '/tree/:urlId',
                component: Test,
                // routes: [],
                icon: <AreaChartOutlined/>,
                display: false
            },
            {
                name: "Tree",
                path: '/test',
                icon: <ExperimentOutlined/>,
                component: Test,
                // routes: [
                //     {
                //         name: translate('routes.generateTreetest'),
                //         path: '/generateTree',
                //         component: GenerateTree,
                //         routes: [],
                //         icon: <ExperimentOutlined/>,
                //         display: true
                //     }, {
                //         name: translate('routes.tasdestestt'),
                //         path: '/test',
                //         routes: [],
                //         icon: <ExperimentOutlined/>,
                //         display: true
                //     }],
                display: false
            }]
    }
];