import { getStream, getState } from 'riot-meiosis';
import * as store from '~/store';

const isGeneratorFunction = (fn) => fn.constructor === (function*(){}()).constructor;

test('it should export an events api', () => {

    expect(store.events).toMatchObject(expect.objectContaining({
        on: expect.any(Function),
        one: expect.any(Function),
        off: expect.any(Function),
        trigger: expect.any(Function),
    }));
});

test('it should have initialized state manager', () => {

    const stream = getStream();
    expect(isGeneratorFunction(stream)).toBe(true);

    const state = getState();
    expect(state).toMatchObject(expect.objectContaining({

        componentAction: expect.any(String),
        apiCalls: expect.any(Number),
        loading: expect.any(Boolean),
        authenticated: expect.any(Boolean),
        isMobile: expect.any(Boolean)
    }));
});