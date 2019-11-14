import { register, mount } from 'riot';
import { getState } from 'riot-meiosis';

// Store binds events to components and is required
import { events } from '~/store';
import Test from '../test.riot';

const stub = {};


test('it should register the component', () => {

    register('test-component', Test);
});


test('it should mount the component', () => {

    const div = document.createElement('div');
    const mounts = mount(div, {}, 'test-component');

    const h1 = div.querySelector('h1');

    expect(!!h1).toBe(true);
    expect(h1.textContent).toBe('test component');

    stub.div = div;
    stub.mount = mounts[0];
});

test('it should have received search state', () => {

    const state = getState();

    // receives search state
    expect(stub.mount.state).toMatchObject(state);

    // Also preserves component state
    expect(stub.mount.state.pepe).toBe(true);
});

test('it should update state when paginate is triggered', () => {

    // This state key should not even exist
    expect(stub.mount.state.paginated).toBe(undefined);

    events.trigger('paginate');

    // It should exist afterwards
    expect(stub.mount.state.paginated).toBe(true);
});

test('it should update message when button is clicked', () => {

    let p = stub.div.querySelector('p');
    const button = stub.div.querySelector('button');

    expect(p.textContent).toBe('');
    expect(stub.mount.state.message).toBe(undefined);

    button.click();

    const shouldBe = 'wow!';
    expect(stub.mount.state.message).toBe(shouldBe);
    expect(p.textContent).toBe(shouldBe);
});
