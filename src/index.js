import * as riot from 'riot';

// Using Erre as state management
import erre from 'erre';
import events from 'bianco.events';

import { debounce } from './utils';

// Import actions from main actions file
import Actions from './actions';

// Import main riot app
import App from './app.riot';

// Import sass entrypoint
import './app.sass';

// Import everything inside components
import './components';

// Initial state
let state = {
    componentAction: null,
    isMobile: null,
    loading: false,
    apiCalls: 0
};

// Create streaming state
const stream = erre(function (update) {

    state = {
        ...state,
        ...update
    };

    return state;
});

// Pass stream to actions
const actions = Actions(stream);

// Run screens action for mobile checks
actions.screenChecks();

// Rerun screen checks on resize
events.add(global, 'resize', debounce(actions.screenChecks, 250));

// Install riot plugin to expose global state and actions in components
riot.install(function (component) {

    component.state = state;
    component.actions = actions;

    // When state is updated, update component state.
    stream.on.value((newState) => component.update(newState));
});

// Mount the App and expose state, actions, and the actual stream
const mountApp = riot.component(App);

mountApp(document.getElementById('root'), {
    stream,
    actions,
    state
});
