const escapePeriod = (name) => name.replace(/\./g, "\\$&");
const inRouteRegex = (name) => new RegExp(`^${escapePeriod(name)}\.?(.+)?`);

const plugin = (component) => {

    const state = (k) => k ? (component.state[k] || {}) : (component.state || {});

    const store = {

        /**
         * Check if on current route
         *
         * @param {string} name
         */
        isRoute(name) {

            return state('route').name === name;
        },

        /**
         * Check if is a component of a parent route (eg: auth)
         * @param {string} name
         */
        inRoute(name) {
            const rgx = inRouteRegex(name);
            return rgx.test(state('route').name || '');
        },

        /**
         * Set active class if on specific route
         * @param {string} name
         */
        activeOn(name) {

            return store.isRoute(name) ? 'active' : '';
        },

        /**
         * Set active class if is a component of a parent route (eg: auth)
         * @param {string} name
         */
        activeIn(name) {

            return store.inRoute(name) ? 'active' : '';
        },

        /**
         * Check if path
         * @param {string} path
         */
        isPath(path) {

            return state('route').path === path;
        },

        /**
         * Check if path has a parameter
         * @param {string} param
         */
        hasParam(param) {

            return Object.keys(
                state('route').params || {}
            )
            .includes(param);
        },

        /**
         * Check if was immediately on previous route
         * @param {string} name
         */
        wasRoute(name) {

            if (!state('previousRoute')) {
                return false;
            }

            return state('previousRoute') === name;
        },

        /**
         * Check if was immediately on previous path
         * @param {string} path
         */
        wasPath(path) {

            if (!state('previousRoute')) {
                return false;
            }

            return state('previousRoute') === path;
        }
    }

    return store;
};

/**
 * Extends riot components to have route helpers
 * @param {RiotComponent} component
 */
export default function (component) {

    Object.assign(component, plugin(component));
};