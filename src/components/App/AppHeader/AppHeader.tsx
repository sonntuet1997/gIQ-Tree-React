import React from 'react';
import 'components/App/AppHeader/AppHeader.scss';
import {APP_TITLE, BASE_URL} from 'config/consts';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import {authService} from 'services/auth-service';
import Avatar from 'antd/lib/avatar';
import {User} from 'models/User';
import {useTranslation} from 'react-i18next';
import {UserOutlined} from '@ant-design/icons';
import logo from './logo.svg';

export interface AppHeaderProps {
    user?: User;
}

function GoBackToHomePage() {
    window.location.href = BASE_URL;
}

function AppHeader(props: AppHeaderProps) {
    const {user} = props;
    const [translate] = useTranslation();

    return (
        <header className="app-header">
            <div className="app-logo" onClick={GoBackToHomePage}>
                <img alt={'d'} className="app-logo-image" src={logo}/>
                <span className="app-logo-text"> {APP_TITLE}</span>
            </div>
            <Dropdown
                className="app-header-user"
                overlay={(
                    <Menu>
                        <Menu.Item>
                            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                                {user?.name}
                            </a>
                        </Menu.Item>
                        <Menu.Item danger onClick={authService.removeCredentials}>{translate('user.logout')}</Menu.Item>
                    </Menu>
                )}
            >
                <Avatar size={40} icon={<UserOutlined/>} src={user?.picture}/>
            </Dropdown>
        </header>
    );
}

export default AppHeader;
