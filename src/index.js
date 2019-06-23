import * as riot from 'riot';
import events from 'bianco.events';

import { debounce } from './utils';
import storage from './utils/storage';

// Import state manager
import * as StateManager from './state';
import StatePlugin from './state/plugin';

// Import actions from main actions file
import Actions from './actions';

// Import route helpers for Riot
import RoutePlugin from './router/plugin';
import RouterRules from './router/rules';

// Import main riot app
import App from './app.riot';
import NotFound from './404.riot';

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

// Pass state manage to actions
const actions = Actions(StateManager.stream, StateManager.getState);

// Run screens action for mobile checks
actions.screenChecks();

// Start router
actions.routerStart();

// Rerun screen checks on resize
events.add(global.window, 'resize', debounce(actions.screenChecks, 100));

// Install state plugin for access to streams and for
// component updates when stream updates.
riot.install(StatePlugin);

// Expose globals inside components
riot.install(function (component) {

    // Access actions from components
    component.actions = actions;

    // Access local storage from any component
    component.storage = storage;
});

// Route helpers
riot.install(RoutePlugin);
RouterRules(StateManager.getState, actions);

riot.register('not-found', NotFound);

// Mount the App and expose state, actions, and the actual stream
const mountApp = riot.component(App);

mountApp(document.getElementById('root'));
