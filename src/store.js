import { createStream, getStream } from 'riot-meiosis';
import Observable from 'riot-observable';

const initialState = {
    componentAction: '',
    authenticated: false,
    isMobile: false,
    loading: false,
    apiCalls: 0
};

const reducer = (newState, oldState) => ({
    ...oldState,
    ...newState
});

createStream(reducer, initialState);

export const events = Observable();
