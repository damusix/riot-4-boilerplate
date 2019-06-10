import ComponentActions from './components/actions';
import viewport from 'bianco.viewport';

import Router from './router';

// Generic actions store
export default (stream, state) => {

    // Set generic actions
    const actions = {

        screenChecks () {

            stream.push({
                isMobile: viewport.documentWidth() < 16 * 40 // 640 px
            });

            console.log(this);
        },

        navigate(...args) {

            Router.navigate(...args);
        },

        routerStart() {

            Router.start((err, route) => {

                stream.push({ route });
            });
        },
    };

    // Pass actions to child actions
    return Object.assign(actions, ComponentActions(stream, state, actions));
};
