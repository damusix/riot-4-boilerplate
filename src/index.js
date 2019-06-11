import * as riot from 'riot';
import events from 'bianco.events';

import { debounce } from './utils';
import storage from './utils/storage';

// Import state manager
import StateManager from './state';

// Import actions from main actions file
import Actions from './actions';

// Import route helpers for Riot
import RoutePlugin from './router/plugin';
import RouterRules from './router/rules';

// Import main riot app
import App from './app.riot';

// Import sass entrypoint
import './app.sass';

// Import everything inside components
import './components';

// Pass state manage to actions
const actions = Actions(StateManager.stream, StateManager.getState);

// Run screens action for mobile checks
actions.screenChecks();

// Start router
actions.routerStart();

// Rerun screen checks on resize
events.add(global, 'resize', debounce(actions.screenChecks, 250));

if (storage.length) {

    const storageState = storage
        .map((key, val) => ({ [key]: val }))
        .reduce((acc, cur) => Object.assign(acc,cur), {});

    StateManager.state.push(storageState);
}

// Expose globals inside components
riot.install(function (component) {

    // Allows you to reference `this.state` and `this.actions` in components
    component.state = StateManager.state;
    component.actions = actions;
    component.stream = StateManager.stream;

    // When state is updated, update component state.
    StateManager.stream.on.value((newState) => component.update(newState));

    // Access local storage from any component
    component.storage = storage;
});

// Route helpers
riot.install(RoutePlugin);
RouterRules(StateManager.getState, actions);

// Mount the App and expose state, actions, and the actual stream
const mountApp = riot.component(App);

mountApp(document.getElementById('root'));
