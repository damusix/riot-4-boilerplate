import { register, component } from 'riot';
import { getStream, RMDevTools, connect } from 'riot-meiosis';
import { Route, Router } from '@riotjs/route'

import './store';

// SASS entrypoint
import './app.sass';

// Call components
import './components';

// Call shared
import './shared';

// Initialize actions
import './actions';


// Base components
import App from './app.riot';
import NotFound from './404.riot';


[
    ['router', Router],
    ['route', Route],
    ['not-found', NotFound],
    ['app', App],
    ['rmdevtools', RMDevTools({ getStream, connect })],
].forEach((args) => register(...args));

const mountApp = component(App);
mountApp(document.getElementById('root'));
