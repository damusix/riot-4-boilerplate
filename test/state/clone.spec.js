import { expect } from 'chai';
import Erre from 'erre';

import Clone from '../../src/state/clone';

const stub = {};

describe('Erre clone plugin', function () {

    it('should install as erre plugin without errors', function () {

        // Check if not installed because of import
        !Erre.clone && Erre.install('clone', Clone);

        expect(Erre.clone).to.be.a('function');
    });

    it('should clone an erre state', function () {

        stub.stream = Erre();
        stub.streamVals = [];

        stub.stream.on.value((val) => {

            stub.streamVals.push(val);
        });

        stub.stream2 = Erre.clone(stub.stream);
        stub.stream2Vals = [];
        stub.stream2.on.value((val) => {

            stub.stream2Vals.push(val);
        });

        expect(stub.stream).to.not.equal(stub.stream2);

        // Prep next test
        stub.stream.push('test');
    });

    it('should pass streams from parent function to child function', async function () {

        expect(stub.streamVals).to.contain.members(stub.stream2Vals);
    });

    it('should remove clones when main stream ends', function () {

        expect(stub.stream.children.size).to.eq(1);
        stub.stream.end();
        expect(stub.stream.children.size).to.eq(0);

    });
});
