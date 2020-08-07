import React, {useState} from 'react';
import 'components/App/AppMenu/AppMenu.scss';
import {RouteConfig} from 'react-router-config';
import {Layout, Menu} from "antd";
import logo from "../AppHeader/logo.svg";
import {APP_TITLE, BASE_URL} from "../../../config/consts";
import AppMenuItem from "./AppMenuItem/AppMenuItem";
import {UploadOutlined, UserOutlined, VideoCameraOutlined} from '@ant-design/icons';

const {Header, Content, Footer, Sider} = Layout;

export interface AppMenuProps {
    menu?: RouteConfig[];
}

function AppMenu({menu}: AppMenuProps) {
    const GoBackToHomePage = () => {
        window.location.href = BASE_URL;
    }
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
    //             inlineCollapsed={this.state.collapsed}
    //         >
    //             <Menu.Item key="1" icon={<PieChartOutlined/>}>
    //                 Option 1
    //             </Menu.Item>
    //             <Menu.Item key="2" icon={<DesktopOutlined/>}>
    //                 Option 2
    //             </Menu.Item>
    //             <Menu.Item key="3" icon={<ContainerOutlined/>}>
    //                 Option 3
    //             </Menu.Item>
    //             <SubMenu key="sub1" icon={<MailOutlined/>} title="Navigation One">
    //                 <Menu.Item key="5">Option 5</Menu.Item>
    //                 <Menu.Item key="6">Option 6</Menu.Item>
    //                 <Menu.Item key="7">Option 7</Menu.Item>
    //                 <Menu.Item key="8">Option 8</Menu.Item>
    //             </SubMenu>
    //             <SubMenu key="sub2" icon={<AppstoreOutlined/>} title="Navigation Two">
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
                    top:0,
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
                <div className="logo" onClick={GoBackToHomePage}>
                    <Menu theme="dark" mode="inline">
                        <Menu.Item key="1" className={"logo-container"}
                                   icon={<img alt={'d'} className="app-logo-image" src={logo}/>}>
                            <b>{APP_TITLE}</b>
                        </Menu.Item>
                    </Menu>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    {/*<Menu.Item key="1" icon={<UserOutlined/>}>*/}
                    {/*    nav 1*/}
                    {/*</Menu.Item>*/}
                    {/*<Menu.Item key="2" icon={<VideoCameraOutlined/>}>*/}
                    {/*    nav 2*/}
                    {/*</Menu.Item>*/}
                    {/*<Menu.Item key="3" icon={<UploadOutlined/>}>*/}
                    {/*    nav 3*/}
                    {/*</Menu.Item>*/}
                    {/*<Menu.Item key="1" icon={<UserOutlined/>}>*/}
                    {/*    nav 4*/}
                    {/*</Menu.Item>*/}
                    {/*<Menu.Item key="2" icon={<VideoCameraOutlined/>}>*/}
                    {/*    nav 5*/}
                    {/*</Menu.Item>*/}
                    {/*<Menu.Item key="3" icon={<UploadOutlined/>}>*/}
                    {/*    nav 6*/}
                    {/*</Menu.Item>*/}
                    {/*<Menu.Item key="1" icon={<UserOutlined/>}>*/}
                    {/*    nav 7*/}
                    {/*</Menu.Item>*/}
                    {/*<Menu.Item key="2" icon={<VideoCameraOutlined/>}>*/}
                    {/*    nav 8*/}
                    {/*</Menu.Item>*/}
                    {/*<Menu.Item key="3" icon={<UploadOutlined/>}>*/}
                    {/*    nav 9*/}
                    {/*</Menu.Item>*/}
                    {/*<Menu.Item key="1" icon={<UserOutlined/>}>*/}
                    {/*    nav 10*/}
                    {/*</Menu.Item>*/}
                    {/*<Menu.Item key="2" icon={<VideoCameraOutlined/>}>*/}
                    {/*    nav 200*/}
                    {/*</Menu.Item>*/}
                    {/*<Menu.Item key="3" icon={<UploadOutlined/>}>*/}
                    {/*    nav 3000*/}
                    {/*</Menu.Item>*/}
                    {/*<Menu.Item key="1" icon={<UserOutlined/>}>*/}
                    {/*    nav 1000*/}
                    {/*</Menu.Item>*/}
                    {/*<Menu.Item key="2" icon={<VideoCameraOutlined/>}>*/}
                    {/*    nav 200000*/}
                    {/*</Menu.Item>*/}
                    {/*<Menu.Item key="3" icon={<UploadOutlined/>}>*/}
                    {/*    nav 3000000*/}
                    {/*</Menu.Item>*/}
                    {/*<Menu.Item key="1" icon={<UserOutlined/>}>*/}
                    {/*    nav 10000*/}
                    {/*</Menu.Item>*/}
                    {/*<Menu.Item key="2" icon={<VideoCameraOutlined/>}>*/}
                    {/*    nav 20000*/}
                    {/*</Menu.Item>*/}
                    {/*<Menu.Item key="3" icon={<UploadOutlined/>}>*/}
                    {/*    nav 30000000*/}
                    {/*</Menu.Item>*/}

                    {menu && menu.map((item) =>
                        item.display ? AppMenuItem({item: item}) : null
                    )}
                </Menu>
            </Sider>
        </>

    );
}

export default AppMenu;
