import React from 'reactn';
import 'views/App/App.scss';
import {Switch, withRouter} from 'react-router-dom';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import {authService} from 'services/auth-service';
import {useTranslation} from 'react-i18next';
import Spin from 'antd/lib/spin';
import Layout from 'antd/lib/layout';
import AppMenu from 'components/App/AppMenu/AppMenu';
import {routes} from "../../config/routes";
import ResultView from "../ResultView/ResultView";
import ResultViewProvider from "../ResultView/ResultViewHook";

const {Content, Footer} = Layout;

function App(props: RouteConfigComponentProps) {
    const {route} = props;
    const [hasToken, hasUser] = authService.useAutoLogin();
    const [translate] = useTranslation();

    // const [user] = React.useGlobal<GlobalState, 'user'>('user');
    // console.info(user);
    React.useEffect(
        () => {
            const rootElement: HTMLDivElement = document.getElementById('root') as HTMLDivElement;
            rootElement.classList.add('default');

            return function cleanup() {
                rootElement.classList.remove('default');
            };
        },
        []);
    // console.log(hasToken, hasUser);
    if (hasToken && hasUser) {
        return (
            <ResultViewProvider>
                <Layout>
                    <AppMenu menu={routes[routes.findIndex(r => r.path === '/')].routes}/>
                    <Layout className="site-layout">
                        {/*<AppHeader user={user}/>*/}
                        {/*<Header className="site-layout-sub-header-background" style={{padding: 0}}/>*/}
                        <Content style={{margin: '0 16px 0', overflow:"overlay", minHeight: 'calc(100vh - 70px)'}}>
                            <Switch>
                                {route?.routes instanceof Array && renderRoutes(route.routes)}
                            </Switch>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>IQ-TREE ©2020</Footer>
                    </Layout>
                </Layout>
                <ResultView>
                </ResultView>
            </ResultViewProvider>
        );
    }
    return (
        <Spin tip={translate('login.loggingIn')}/>
    );
}

export default withRouter(App);
