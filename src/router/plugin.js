const inRouteRegex = (name) => new RegExp(`^${name}\.?(.+)?`);

const plugin = (component) => {

    const state = (k) => k ? (component.state[k] || {}) : (component.state || {});

    const store = {
        // Check if on current route
        isRoute(name) {

            return state('route').name === name;
        },

        // Check if is a component of a parent route (eg: auth)
        inRoute(name) {
            const rgx = inRouteRegex(name);
            return rgx.test(state('route').name || '');
        },

        // Set active class if on specific route
        activeOn(name) {

            return store.isRoute(name) ? 'active' : '';
        },

        // Set active class if is a component of a parent route (eg: auth)
        activeIn(name) {

            return store.inRoute(name) ? 'active' : '';
        },

        // Check if path
        isPath(path) {

            return state('route').path === path;
        },

        // Check if path has a parameter
        hasParam(param) {

            return Object.keys(
                state('route').params || {}
            )
            .includes(param);
        },

        // Check if was immediately on previous route
        wasRoute(name) {

            if (!state('previousRoute')) {
                return false;
            }

            return state('previousRoute') === name;
        },

        // Check if was immediately on previous path
        wasPath(path) {

            if (!state('previousRoute')) {
                return false;
            }

            return state('previousRoute') === path;
        }
    }

    return store;
};

export default function (component) {

    Object.assign(component, plugin(component));
};