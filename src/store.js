import { createStream } from 'riot-meiosis';

const initialState = {
    componentAction: null,
    authenticated: false,
    isMobile: null,
    loading: false,
    apiCalls: 0
};

const reducer = (newState, oldState) => ({
    ...oldState,
    ...newState
});

createStream(reducer, initialState);