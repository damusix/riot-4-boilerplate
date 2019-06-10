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

// Create streaming state
const stream = Erre(function (update) {

    state = {
        ...state,
        ...update
    };

    return state;
});

const getState = () => state;

Router.subscribe((route) => {

    stream.push({ ...route });

    console.log('state', state);
});


export default { state, stream, getState };