import React from 'react';
import './AppMenuItem.scss';
import {RouteConfig} from 'react-router-config';
import {Menu} from "antd";
import {Link} from "react-router-dom";

const {SubMenu} = Menu;

export interface AppMenuItemProps {
    item: RouteConfig;
}

function AppMenuItem({item}: AppMenuItemProps) {
    if (!item.display) return null;
    if (item.routes instanceof Array && item.routes.length > 0) {
        let test = (
            <SubMenu key={item.name} icon={item.icon}
                     title={item.name}>
                {item.routes.map(subItem => {
                    return AppMenuItem({item: subItem})
                })}
            </SubMenu>
        );
        return test;
    }
    return (<Menu.Item key={item.name} icon={item.icon}>
        <Link to={item.path as string}>
            {item.name}
        </Link>
    </Menu.Item>)
}

export default AppMenuItem;
