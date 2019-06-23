import { expect } from 'chai';
import Actions from '../src/actions';

const stub = {
    pushFn: (state) => expect(state).to.be.an('object'),
    stream: {
        push: (state) => stub.pushFn(state)
    },
};

describe('Base Actions', function () {

    it('should only require stream and state', function () {

        stub.actions = Actions(stub.stream, {});
        expect(stub.actions).to.be.an('object');
    });

    it('should have base actions', function () {


        expect(stub.actions).to.include.keys(
            'screenChecks',
            'navigate',
            'routerStart'
        );
    });

    it('should start the router', function () {

        stub.pushFn = (state) => {

            expect(state).to.have.key('route');
            expect(state.route).to.be.an('object');
            expect(state.route).to.include.keys(
                'name',
                'params',
                'path',
                'meta'
            );
        };

        stub.actions.routerStart();

    });

    it('should check if app is on a mobile screen', function () {

        stub.pushFn = (state) => {
            expect(state).to.have.key('isMobile');
        };

        stub.actions.screenChecks();
    });

    it ('should merge all actions with itself', function () {

        expect(Object.keys(stub.actions)).to.have.a.lengthOf.above(3)
    });
});
