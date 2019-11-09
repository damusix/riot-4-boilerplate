import { add } from 'bianco.events';
import viewport from 'bianco.viewport';
import { $ } from 'bianco';
import { getStream } from 'riot-meiosis';
import { debounce } from 'underscore/debounce';

import KeyCodes from '#/keycodes';
import { events } from './store';

const stream = getStream();

export const lock = () => $('body')[0].style.overflow = 'hidden';

export const unlock = () => $('body')[0].style.overflow = '';

export const getScreens = debounce(() => {

    const documentWidth = viewport.documentWidth();


    const screens = {
        isMobile: documentWidth < 678,
        isTablet: documentWidth > 678 && documentWidth < 1024,
        isDesktop: documentWidth > 1024,
        scrollTop: viewport.scrollTop()
    };

    stream.push(screens);
}, 100);


// On ready
add(document, 'DOMContentLoaded', () => {

    stream.push({ appReady: true });
    events.trigger('ready');
});

// On keydown
add(window, 'keydown', (e) => {

    events.trigger(KeyCodes[e.keyCode], e);
});

// On click
add(window, 'click', (e) => {

    events.trigger('click', e);
});

// On resize
add(window, 'resize', (e) => {

    getScreens();
    events.trigger('resize', e);
});

// On scroll
add(window, 'scroll', (e) => {

    getScreens()
    events.trigger('scroll', e);
});