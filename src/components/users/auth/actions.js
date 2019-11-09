import { getStream } from 'riot-meiosis';

import storage from '../../../utils/storage';

const stream = getStream();


export function redirectHomeIfAuth() {

    if (state().authenticated) {

        actions.navigate('home');
    }
};

export function login(payload) {

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
};

export function register(payload) {

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
};

export function logout() {

    stream.push({ loading: true });

    setTimeout(() => {

        stream.push({
            authenticated: false,
            loading: false
        });
        storage.rmv('authenticated');

        actions.navigate('auth.login');
    }, 1000);
};

export function requestReset(payload) {};

export function resetPassword(payload) {};

