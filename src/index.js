import { register, component } from 'riot';
import { getStream, RMDevTools, connect } from 'riot-meiosis';
import { Route, Router } from '@riotjs/route'

import storage from '#/storage';
import './store';


// Import main riot app
import App from './app.riot';
import NotFound from './404.riot';

// Import sass entrypoint
import './app.sass';

// Import everything inside components
import './components';

import * as actions from './actions';

const stream = getStream();

if (storage.length) {

    const storageState = storage
        .map((key, val) => ({ [key]: val }))
        .reduce((acc, cur) => Object.assign(acc,cur), {});

    stream.push(storageState);
}

console.log(RMDevTools);

[
    ['router', Router],
    ['route', Route],
    ['not-found', NotFound],
    ['app', App],
    ['rmdevtools', RMDevTools({ getStream, connect })],
].forEach((args) => register(...args));

const mountApp = component(App);
mountApp(document.getElementById('root'));
