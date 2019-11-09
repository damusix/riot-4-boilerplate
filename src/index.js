import * as riot from 'riot';
import events from 'bianco.events';
import { getState } from 'riot-meiosis';

import { debounce } from './utils';
import storage from './utils/storage';


// Import route helpers for Riot
import RouterRules from './router/rules';
import { routerStart } from './router';
import { screenChecks } from './actions';

// Import main riot app
import App from './app.riot';
import NotFound from './404.riot';

import './store';

// Import sass entrypoint
import './app.sass';

// Import everything inside components
import './components';

if (storage.length) {

    const storageState = storage
        .map((key, val) => ({ [key]: val }))
        .reduce((acc, cur) => Object.assign(acc,cur), {});

    StateManager.mergeState(storageState);
}

// Run screens action for mobile checks
screenChecks();

// Start router
routerStart();

// Rerun screen checks on resize
events.add(global.window, 'resize', debounce(screenChecks, 100));

RouterRules(getState());

riot.register('not-found', NotFound);

// Mount the App
const mountApp = riot.component(App);

mountApp(document.getElementById('root'));
