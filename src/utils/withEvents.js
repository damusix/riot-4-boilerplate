import { events } from '~/store';

// This maps event functions into components
// and removes listeners before unmount
export default (component) => {

    const eventListeners = [];

    const bindEvent = (fn) => (event, listener) => {

        eventListeners.push([event, listener]);
        events[fn](event, listener);
    };

    component.on = bindEvent('on');
    component.one = bindEvent('one');
    component.trigger = events.trigger;
    component.off = events.off;

    const originalBeforeUnmount = component.onBeforeUnmount;

    component.onBeforeUnmount = function (...args) {

        for (const [event, listener] of eventListeners) {
            events.off(event, listener);
        }

        if (originalBeforeUnmount) {

            originalBeforeUnmount(...args);
        }
    };

    return component;
};