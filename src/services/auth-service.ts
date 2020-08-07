import React from 'reactn';
import {GoogleLoginResponse, GoogleLoginResponseOffline} from 'react-google-login';
import {authRepository, AuthTokenResponse} from 'repositories/auth-repository';
import nameof from 'ts-nameof.macro';
import initialGlobalState, {GlobalState} from 'config/global-state';
import {userRepository} from 'repositories/user-repository';
import {Subscription} from 'rxjs';
import {useLocation} from 'react-router-dom';
import {HOME_ROUTE, LOGIN_ROUTE} from 'config/route-consts';
import {User} from 'models/User';

export const authService = {
  async saveCredentials(authResponse: AuthTokenResponse) {
    await React.setGlobal<GlobalState>(authResponse);
    localStorage.setItem(nameof(authResponse.accessToken), authResponse.accessToken);
    localStorage.setItem(nameof(authResponse.refreshToken), authResponse.refreshToken);
  },

  async removeCredentials() {
    await React.setGlobal<GlobalState>({
      accessToken: null,
      refreshToken: null,
    });
    localStorage.removeItem(nameof(initialGlobalState.accessToken));
    localStorage.removeItem(nameof(initialGlobalState.refreshToken));
    authService.redirectToLogin();
  },

  redirectToLogin() {
    window.location.href = LOGIN_ROUTE;
  },

  redirectToHome() {
    window.location.href = HOME_ROUTE;
  },

  useGoogleLogin(): [
    (response: GoogleLoginResponse | GoogleLoginResponseOffline) => void,
    (error: Error) => void,
  ] {
    const handleSuccess = React.useCallback(
      (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        if ('accessToken' in response) {
          authRepository.loginGoogle(response.tokenId)
            .subscribe(
              async (authResponse) => {
                await this.saveCredentials(authResponse);
              },
            );
        }
      },
      [],
    );

    const handleFailure = React.useCallback(
      (error: Error) => {
        console.log(error);
      },
      [],
    );

    return [
      handleSuccess,
      handleFailure,
    ];
  },

  useAutoLogin(): [
    boolean,
    boolean,
  ] {
    const [accessToken] = React.useGlobal<GlobalState, 'accessToken'>('accessToken');
    const [user, setUser] = React.useGlobal<GlobalState, 'user'>('user');
    const {pathname} = useLocation();

    let hasToken: boolean = typeof accessToken === 'string' && accessToken !== '';

    let hasUser: boolean = !!user;

    //Todo: Fixed Value
    hasUser = true;
    hasToken = true;

    React.useEffect(
      () => {
        const subscription: Subscription = new Subscription();

        if (!hasUser) {
          /**
           * If user is not authenticated
           */
          if (hasToken) {
            subscription.add(
              userRepository.current()
                .subscribe(
                  async (user: User) => {
                    await setUser(user);
                  },
                ),
            );
          } else {
            if (pathname !== LOGIN_ROUTE) {
              authService.redirectToLogin();
            }
          }
        } else {
          /**
           * If user is authenticated
           */
          if (pathname === LOGIN_ROUTE) {
            authService.redirectToHome();
          }
        }

        return function cleanup() {
          subscription.unsubscribe();
        };
      },
      [hasToken, hasUser, pathname, setUser, user],
    );

    return [
      hasToken,
      hasUser,
    ];
  },
};
