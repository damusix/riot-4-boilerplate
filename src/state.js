// Using Erre as state management
import Erre from 'erre';
import Router from './router';

// Initial state
let state = {
    componentAction: null,
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

Router.subscribe((route, prevRoute) => {

    stream.push({ ...route, prevRoute });

    console.log('state', state);
});


export default { state, stream };