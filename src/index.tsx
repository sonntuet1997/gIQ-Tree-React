import React from 'reactn';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch} from 'react-router-dom';
import * as serviceWorker from 'service-worker';
import {renderRoutes} from 'react-router-config';
import {routes} from 'config/routes';
import initialGlobalState, {GlobalState} from 'config/global-state';
import addDevTools from 'reactn-devtools';
import {IS_DEVELOPMENT} from 'config/consts';
import LoadingScreen from 'components/LoadingScreen/LoadingScreen';
import './styles';
import {translationService} from 'react3l/services';
import {TranslationRepository} from "react3l/repositories";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import ErrorScreen from "./components/ErrorScreen/ErrorScreen";
import {I18N_ROUTE} from "./config/route-consts";
import translationEN from "./i18nn/en.json";
import translationVI from "./i18nn/vi.json";

TranslationRepository.baseURL = I18N_ROUTE;
const AppEntry = React.lazy(async () => {
    /**
     * Add ReactN devTools in development
     */
    if (IS_DEVELOPMENT) {
        addDevTools();
    }
    /**
     * Setup global state
     */
    await React.setGlobal<GlobalState>(initialGlobalState);
    /**
     * Setup translation
     */
    await translationService.initTranslation();
    await translationService.addResource('vi', translationVI);
    await translationService.addResource('en', translationEN);
    await translationService.changeLanguage('en');
    /**
     * Return the main component
     */
    return {
        default: function AppEntry() {
            return (
                <Switch>
                    {renderRoutes(routes)}
                </Switch>
            )
        },
    };
});

ReactDOM.render(
    <ErrorBoundary fallback={ErrorScreen}>
        <BrowserRouter>
            <React.Suspense fallback={<LoadingScreen/>}>
                <AppEntry/>
            </React.Suspense>
        </BrowserRouter>
    </ErrorBoundary>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
if (IS_DEVELOPMENT) {
    serviceWorker.unregister();
} else {
    serviceWorker.register();
}
