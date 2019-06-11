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

            actions.navigate('home');
        }, 1000);
    },
    requestReset(payload) {},
    resetPassword(payload) {},
});