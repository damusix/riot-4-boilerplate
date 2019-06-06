// Using Erre as state management
import Erre from 'erre';

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

export default stream