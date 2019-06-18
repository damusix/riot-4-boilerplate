import Erre from 'erre';

import { stream, getState } from '.';

/**
 * Merges component state and global state and gives
 * components access to local stream and global stream.
 * Both stream produce updates to state, however, local stream
 * should only dispatch to local values, while global stream
 * would trigger updates to all subscribed components
 * https://github.com/riot/riot/issues/2708#issuecomment-501443045 *
 */
export default function (component) {

    // store the original onUnmounted call if it exists
    const { onUnmounted, state } = component;

    // Merge global state to local state.
    // Global state supersedes local state.
    component.state = {
        ...state,
        ...getState()
    };

    // clone the main stream and link in case you need local updates in your component
    component.stream = Erre.clone(stream);

    // link the main stream in case you want to dispatch global events
    component.mainStream = stream;

    // wrap the onUnmounted callback to end the cloned stream
    // when the component will be unmounted
    component.onUnmounted = (...args) => {

        onUnmounted.apply(component, args);
        component.stream.end();
    };

    // When state is updated, update component state.
    component.stream.on.value(newState => component.update(newState));
};