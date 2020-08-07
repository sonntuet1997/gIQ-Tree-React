import {RouteConfig} from 'react-router-config';
import {HOME_ROUTE} from 'config/route-consts';
import {translate} from "react3l/helpers/i18n";

export const menu: RouteConfig[] = [
    // {
    //   name: translate('menu.userList'),
    //   path: USER_ROUTE,
    //   children: [
    //     {
    //       name: translate('menu.userList'),
    //       path: USER_ROUTE,
    //       children: [],
    //     },
    //     {
    //       name: translate('menu.userList'),
    //       path: USER_ROUTE,
    //       children: [],
    //     },
    //   ],
    // },
    {
        name: translate('menu.home'),
        path: HOME_ROUTE
    },
    {
        name: translate('menu.generateTrees'),
        path: 'generateTree',
        // children: [
        //     {
        //         name: "đasadsad('menu.userList')",
        //         path: USER_ROUTE,
        //         children: [],
        //     },
        //     {
        //         name: "xxxxxxtranslate('menu.userList')",
        //         path: USER_ROUTE,
        //         children: [],
        //     },
        // ],
    }
];
