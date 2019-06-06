import * as riot from 'riot';
import events from 'bianco.events';

import { debounce } from './utils';

// Import state manage
import StateManager from './state';

// Import actions from main actions file
import Actions from './actions';

// Import main riot app
import App from './app.riot';

// Import sass entrypoint
import './app.sass';

// Import everything inside components
import './components';

// Pass state manage to actions
const actions = Actions(StateManager);

// Run screens action for mobile checks
actions.screenChecks();

// Rerun screen checks on resize
events.add(global, 'resize', debounce(actions.screenChecks, 250));

// Install riot plugin to expose global state and actions in components
riot.install(function (component) {

    // Allows you to reference `this.state` and `this.actions` in components
    component.state = state;
    component.actions = actions;

    // When state is updated, update component state.
    StateManager.on.value((newState) => component.update(newState));
});

// Mount the App and expose state, actions, and the actual stream
const mountApp = riot.component(App);

mountApp(document.getElementById('root'), {
    StateManager,
    actions,
    state
});
