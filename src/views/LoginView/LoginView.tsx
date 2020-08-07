import React from 'react';
import './LoginView.scss';
import GoogleLogin from 'react-google-login';
import {GOOGLE_CLIENT_ID} from 'config/consts';
import {authService} from 'services/auth-service';
import classNames from 'classnames';
import Spin from 'antd/lib/spin';
import {useTranslation} from 'react-i18next';

function LoginView() {
    const [translate] = useTranslation();

    const [handleSuccess, handleFailure] = authService.useGoogleLogin();

    // const [hasToken, hasUser] = authService.useAutoLogin();
    const [hasToken, hasUser] = [false, false];

    return (
        <div className={classNames('page', 'login')}>
            {!hasToken && !hasUser && (
                <GoogleLogin
                    clientId={GOOGLE_CLIENT_ID}
                    onFailure={handleFailure}
                    onSuccess={handleSuccess}
                    buttonText={translate('login.withGoogle')}
                />
            )}
            {hasToken && !hasUser && (
                <Spin tip={translate('login.loggingInWithGoogle')}/>
            )}
        </div>
    );
}

export default LoginView;
