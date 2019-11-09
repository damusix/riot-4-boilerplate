import Router from '.';

/**
 * Adds route rules
 * @param {function} state State accessor
 */
export default function (state) {

    /**
     * RULE: Redirect to home page if authenticated.
     */
    [
        'auth.login',
        'auth.register'
    ].forEach((route) => {

        Router.canActivate(route, (router) => (rState, rPrevState, done) => {

            if (state().authenticated) {

                return Promise.reject({
                    redirect: { name: 'home' }
                });
            }

            return true;
        })
    });

    /**
     * RULE: Redirect to login page if unauthenticated.
     */
    [
        'user.profile',
        'admin'
    ].forEach((route) => {

        Router.canActivate(route, (router) => (rState, rPrevState, done) => {

            if (!state().authenticated) {

                return Promise.reject({
                    redirect: { name: 'login' }
                });
            }

            return true;
        })
    });
};