// Using Erre as state management
import Erre from 'erre';

import Router from '../router';
import Clone from './clone';
import InitialState from './initialState';

Erre.install('clone', Clone);

export const state = { ...InitialState };

export const getState = () => state;

export const mergeState = function (update) {

    return Object.assign(state, update);
};

// Create streaming state
export const stream = Erre(mergeState);

Router.subscribe((route) => {

    stream.push({ ...route });
});