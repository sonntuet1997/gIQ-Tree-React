import React from 'reactn';
import 'views/App/App.scss';
import {Switch, withRouter} from 'react-router-dom';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import {authService} from 'services/auth-service';
import {useTranslation} from 'react-i18next';
import {GlobalState} from 'config/global-state';
import Spin from 'antd/lib/spin';
import Layout from 'antd/lib/layout';
import AppMenu from 'components/App/AppMenu/AppMenu';
import {routes} from "../../config/routes";
import ResultView from "../ResultView/ResultView";

const {Header, Content, Footer, Sider} = Layout;

function App(props: RouteConfigComponentProps) {
    const {route} = props;

    const [hasToken, hasUser] = authService.useAutoLogin();

    const [translate] = useTranslation();

    const [user] = React.useGlobal<GlobalState, 'user'>('user');

    React.useEffect(
        () => {
            const rootElement: HTMLDivElement = document.getElementById('root') as HTMLDivElement;
            rootElement.classList.add('default');

            return function cleanup() {
                rootElement.classList.remove('default');
            };
        },
        [],
    );
    console.log(hasToken, hasUser);
    if (hasToken && hasUser) {
        return (
            <>
                <Layout className="app">
                    <AppMenu menu={routes[routes.findIndex(r => r.path == '/')].routes}/>
                    <Layout>
                        {/*<AppHeader user={user}/>*/}
                        {/*<Header className="site-layout-sub-header-background" style={{padding: 0}}/>*/}
                        <Content style={{margin: '24px 16px 0'}}>
                            {/*<main className="app-main">*/}
                            <Switch>
                                {route?.routes instanceof Array && renderRoutes(route.routes)}
                            </Switch>
                            {/*</main>*/}
                            {/*<div className="site-layout-background" style={{padding: 24, minHeight: 360}}>*/}
                            {/*    content*/}
                            {/*</div>*/}
                        </Content>
                        <Footer style={{textAlign: 'center'}}>IQ-TREE ©2020 Created by Sonntuet</Footer>
                    </Layout>
                </Layout>
                <ResultView>
                </ResultView>
            </>
        );
    }
    return (
        <Spin tip={translate('login.loggingIn')}/>
    );
}

export default withRouter(App);
