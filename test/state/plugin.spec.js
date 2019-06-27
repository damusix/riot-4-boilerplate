import { expect } from 'chai';

import Plugin from '../../src/state/plugin';
import { state } from '../../src/state';

const stub = {
    wasUnmounted: () => {},
    wasUpdated: () => {},
    state: {
        existingState: true
    },
    onUnmounted: () => stub.wasUnmounted(),
    update: (val) => stub.wasUpdated(val)
};

describe('Riot state plugin', function () {

    it('should bind state related functionality to component', function () {

        expect(stub).to.not.include.keys(
            'getState',
            'stream',
            'mainStream'
        )
        Plugin(stub);
        expect(stub).to.include.keys(
            'getState',
            'stream',
            'mainStream'
        )
    });

    it('should have a clone of main stream', function () {

        expect(stub.stream).to.not.equal(stub.mainStream);

        const children = Array.from(stub.mainStream.children);
        expect(stub.stream).to.equal(children[0]);
    });

    it('should have copied initial state into component state', function () {

        expect(stub.state).to.include.keys(...Object.keys(state));
        expect(stub.state.existingState).to.eq(true);
    });

    it('should update component on stream push', async () => {

        let updatedState = false;
        const update = { success: true };
        stub.wasUpdated = (newState) => {


            expect(newState).to.include.keys('success');
            expect(newState.success).to.eq(true);

            updatedState = true;
        }

        await stub.stream.push(update);
        expect(updatedState).to.eq(true);

    });

    it('should end stream on unmount', function () {

        let ranOriginal = false;
        let streamEnd = false;

        stub.stream.on.end(() => streamEnd = true);

        stub.wasUnmounted = () => ranOriginal = true;

        stub.onUnmounted();

        expect(ranOriginal).to.eq(true);
        expect(streamEnd).to.eq(true);
    });
});
