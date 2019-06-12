// Using Erre as state management
import Erre from 'erre';
import Router from './router';

// Initial state
let state = {
    componentAction: null,
    authenticated: false,
    isMobile: null,
    loading: false,
    apiCalls: 0
};

const getState = () => state;

const mergeState = function (update) {

    state = {
        ...state,
        ...update
    };

    return state;
}

// Create streaming state
const stream = Erre(mergeState);


Router.subscribe((route) => {

    stream.push({ ...route });
});


export default { state, stream, getState, mergeState };