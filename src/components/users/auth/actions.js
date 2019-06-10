export default (stream) => ({

    login(payload) {

        stream.push({ loading: true });

        setTimeout(() => {

            stream.push({
                authenticated: true,
                loading: false
            });
        }, 1000);
    },
    register(payload) {

        stream.push({ loading: true });

        setTimeout(() => {

            stream.push({
                authenticated: true,
                loading: false
            });
        }, 1000);
    },
    requestReset(payload) {},
    resetPassword(payload) {},
});