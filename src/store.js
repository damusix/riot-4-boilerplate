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

const stream = getStream();

if (storage.length) {

    const storageState = storage
        .map((key, val) => ({ [key]: val }))
        .reduce((acc, cur) => Object.assign(acc,cur), {});

    stream.push(storageState);
}


export const events = Observable();
