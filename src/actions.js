import ComponentActions from './components/actions';
import viewport from 'bianco.viewport';

import Router from './router';

// Generic actions store
export default (stream) => ({

    screenChecks () {

        stream.push({
            isMobile: viewport.documentWidth() < 16 * 40 // 640 px
        });
    },

    navigate(...args) {

        Router.navigate(...args);
    },

    routerStart() {

        Router.start((err, route) => {

            stream.push({ route });
        });
    },

    // Splat component actions into main actions store
    ...ComponentActions(stream)
});
