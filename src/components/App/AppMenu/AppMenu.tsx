import React, {useState} from 'react';
import 'components/App/AppMenu/AppMenu.scss';
import {RouteConfig} from 'react-router-config';
import {Layout, Menu} from "antd";
import logo from "../AppHeader/logo.svg";
import {APP_TITLE, BASE_URL} from "../../../config/consts";
import AppMenuItem from "./AppMenuItem/AppMenuItem";

const {Header, Content, Footer, Sider} = Layout;

export interface AppMenuProps {
    menu?: RouteConfig[];
}

function AppMenu({menu}: AppMenuProps) {
    const GoBackToHomePage = () => {
        window.location.href = BASE_URL;
    }
    console.log(menu);
    const [state, setState] = useState({collapsed: false});
    const toggleCollapsed = () => {
        setState({
            collapsed: !state.collapsed,
        });
    };
    //
    // return (
    //     <div style={{width: 256}}>
    //
    //         <Menu
    //             defaultSelectedKeys={['1']}
    //             defaultOpenKeys={['sub1']}
    //             mode="inline"
    //             theme="dark"
    //         >
    //             <Menu.Item key="1" icon={<UploadOutlined/>}>
    //                 Option 1
    //             </Menu.Item>
    //             <Menu.Item key="2" icon={<UploadOutlined/>}>
    //                 Option 2
    //             </Menu.Item>
    //             <Menu.Item key="3" icon={<UploadOutlined/>}>
    //                 Option 3
    //             </Menu.Item>
    //             <SubMenu key="sub1" icon={<UploadOutlined/>} title="Navigation One">
    //                 <Menu.Item key="5">Option 5</Menu.Item>
    //                 <Menu.Item key="6">Option 6</Menu.Item>
    //                 <Menu.Item key="7">Option 7</Menu.Item>
    //                 <Menu.Item key="8">Option 8</Menu.Item>
    //             </SubMenu>
    //             <SubMenu key="sub2" icon={<UploadOutlined/>} title="Navigation Two">
    //                 <Menu.Item key="9">Option 9</Menu.Item>
    //                 <Menu.Item key="10">Option 10</Menu.Item>
    //                 <SubMenu key="sub3" title="Submenu">
    //                     <Menu.Item key="11">Option 11</Menu.Item>
    //                     <Menu.Item key="12">Option 12</Menu.Item>
    //                 </SubMenu>
    //             </SubMenu>
    //         </Menu>
    //     </div>
    // );
    return (
        <>
            <Sider
                collapsible collapsed={state.collapsed}
                breakpoint="lg"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    toggleCollapsed();
                    console.log(collapsed, type);
                }}>
            </Sider>
            <Sider
                style={{
                    overflowX: 'hidden',
                    height: 'calc(100vh - 48px)',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    zIndex: 999
                }}
                collapsed={state.collapsed}
                collapsible
                breakpoint="lg"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    toggleCollapsed();
                    console.log(collapsed, type);
                }}>
                <div style={{height: "calc(100vh - 70px)"}}>
                    <div className="logo" onClick={GoBackToHomePage}>
                        <Menu theme="dark" mode="inline">
                            <Menu.Item key="1" className={"logo-container"}
                                       icon={<img alt={'d'} className="app-logo-image" src={logo}/>}>
                                <b>{APP_TITLE}</b>
                            </Menu.Item>
                        </Menu>
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        {menu && menu.map((item) =>
                            item.display ? AppMenuItem({item: item}) : null
                        )}
                    </Menu>
                    <div style={{
                        marginTop: "1rem",
                        color: "gray",
                        fontSize: "small",
                        textAlign: "center",
                        width: "100%",
                        visibility: (state.collapsed ? "hidden" : "visible")
                    }}>
                        <div>IQ-TREE ©2020</div>
                        {/*<div>Created by SonNT-UET</div>*/}
                    </div>
                </div>

            </Sider>
        </>

    );
}

export default AppMenu;
