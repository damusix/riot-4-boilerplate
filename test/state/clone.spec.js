import { expect } from 'chai';
import Erre from 'erre';

import Clone from '../../src/state/clone';

const stub = {};

describe('Erre clone plugin', function () {

    it('should install as erre plugin without errors', function () {

        Erre.install('clone', Clone);

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
    });

    it('should pass streams from parent function to child function', async function () {

        await stub.stream.push('test');

        console.log(stub.streamVals)
        console.log(stub.stream2Vals)
    });
});
