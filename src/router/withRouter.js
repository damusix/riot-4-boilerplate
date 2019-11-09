import { getState } from 'riot-meiosis';

const escapePeriod = (name) => name.replace(/\./g, "\\$&");
const inRouteRegex = (name) => new RegExp(`^${escapePeriod(name)}\.?(.+)?`);

export default (component) => {

    const route = () => getState().route;
    const previousRoute = () => getState().previousRoute;

    const store = {

        /**
         * Check if on current route
         *
         * @param {string} name
         */
        isRoute(name) {

            return route().name === name;
        },

        /**
         * Check if is a component of a parent route (eg: auth)
         * @param {string} name
         */
        inRoute(name) {
            const rgx = inRouteRegex(name);
            return rgx.test(route().name || '');
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

            return route().path === path;
        },

        /**
         * Check if path has a parameter
         * @param {string} param
         */
        hasParam(param) {

            return Object.keys(
                route().params || {}
            )
            .includes(param);
        },

        /**
         * Check if was immediately on previous route
         * @param {string} name
         */
        wasRoute(name) {

            if (!previousRoute()) {
                return false;
            }

            return previousRoute() === name;
        },

        /**
         * Check if was immediately on previous path
         * @param {string} path
         */
        wasPath(path) {

            if (!previousRoute()) {
                return false;
            }

            return previousRoute() === path;
        }
    }

    return Object.assign(component, store);
};
