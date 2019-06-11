import storage from '../../../utils/storage';

export default (stream, state, actions) => ({

    redirectHomeIfAuth() {

        if (state().authenticated) {

            actions.navigate('home');
        }
    },
    login(payload) {

        stream.push({ loading: true });

        setTimeout(() => {

            stream.push({
                authenticated: true,
                loading: false,
                ...payload
            });

            storage.set('authenticated', true);

            actions.navigate('home');
        }, 1000);
    },
    register(payload) {

        stream.push({ loading: true });

        setTimeout(() => {

            stream.push({
                authenticated: true,
                loading: false,
                ...payload
            });

            storage.set('authenticated', true);

            actions.navigate('home');
        }, 1000);
    },
    logout() {

        stream.push({ loading: true });

        setTimeout(() => {

            stream.push({
                authenticated: false,
                loading: false
            });
            storage.rmv('authenticated');

            actions.navigate('auth.login');
        }, 1000);
    },
    requestReset(payload) {},
    resetPassword(payload) {},
});