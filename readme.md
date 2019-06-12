# Riot 4 Boilerplate

Starting point for working with Riot 4. This boilerplate comes with:

- SASS boilerplate based on [Milligram IO](http://milligram.io)
- [BiancoJS](https://github.com/biancojs/bianco)
- [AnimeJS](https://animejs.com)
- [Fontawesome 5](http://fontawesome.io)
- [AxiosJS](https://github.com/axios/axios)
- Streaming state management using [Erre](https://github.com/GianlucaGuarini/erre)
- Routing using [Router5](https://router5.js.org)
- Webpack Hot reloading

## Table of Contents

* [Usage](#usage)
* [Structure](#structure)
    * [State](#state)
    * [Router](#router)
        * [Route states](#route-states)
        * [Route Helpers](#route-helpers)
    * [Components](#components)
    * [Riot Templates](#riot-templates)
    * [Actions](#actions)
        * [src/actions.js](#srcactionsjs)
        * [src/components/actions.js](#srccomponentsactionsjs)
        * [src/components/users/actions.js](#srccomponentsusersactionsjs)
    * [SASS Structure](#sass-structure)
* [TODO](#todo)

---

## Usage

```
git clone https://github.com/damusix/riot-4-boilerplate
cd riot-4-boilerplate
npm install
npm start
open http://localhost:3000
```

Build assets into `public/` folder:
```
npm run build
```

## Structure

### State

State is initialized in `src/state.js` along with helper functions shared across the app. The following example is how you can use it as a module:

```js
const StateManager = require('./state');

// Get current state
const state = StateManager.getState();

// Update directly
StateManager.mergeState({ newState: true });

// Update using state stream
StateManager.stream.push({ updatedVia: 'stream' });

// Update using state stream
StateManager.stream.push(async () => await thingsToHappen());

// Listen for changes to stream
StateManager.stream.on.value((newState) => console.log(newState));
```

You can read more about the stream library on [Erre's API](https://github.com/GianlucaGuarini/erre). This is an implementation of [meiosis pattern](http://meiosis.js.org/) - Meiosis is a design pattern that implements state management using streams. I am implementing meiosis against foxdonut's recommended setup and going with an all-in Riot implementation using the libraries created by GianlucaGuarini, creator of Riot.

### Router

Router is based on [Router5](https://router5.js.org). Read about it and learn how it implements state.

- Route instance is defined and imported from `src/router`.
- Routes are declared in `src/router/routes.js`.
- Route rules (such as auth redirect) are declared in `src/router/rules.js`. Permissions can also be baked into this file.
- Options can be adjusted in `src/router/options.js`
- Riot route helpers are found in `src/router/plugin.js`

##### Route states

Route state are passed to app state as `route` and `previousRoute`. Route states look like this:

```
{
    ...

    "route": {
        "name": "example",
        "params": {},
        "path": "/example",
        "meta": {
        "params": {
            "example": {}
        },
        "options": {
            "push": true
        },
        "id": 3
        }
    },
    "previousRoute": {
        "name": "home",
        "params": {},
        "path": "/",
        "meta": {
        "params": {
            "home": {}
        },
        "id": 1
        }
    }
}
```

##### Route Helpers

Available in all components

- *isRoute(name)*: Check if on current route
- *inRoute(name)*: Check if is a component of a parent route (eg: auth)
- *activeOn(name)*: Set active class if on specific route
- *activeIn(name)*: Set active class if is a component of a parent route (eg: auth)
- *isPath(name)*: Check if path
- *hasParam(param)*: Check if path has a parameter
- *wasRoute(name)*: Check if was immediately on previous route
- *wasPath(name)*: Check if was immediately on previous path

### Components

Componets are declared as folders inside of `src/components/` and, when relevant, should contain the following main items:
- `style.sass`
- `actions.js`
- `component.riot`

The convention this implementation is following is as follows:
- Keep all things related to the component inside the component folder, including styles and actions
- Register components to Riot in `src/components/index.js` in order to keep things in 1 place
    - If there ever is a component group that scales out and clutters `src/component/index.js`, then a more appropriate flow would be to use `src/components/massiveParentComponent/index.js` to register riot components, and simply import `index` into main components.
    - Repeat this pattern in nested sub-components so to keep the exact same, predictable structure. It will help keep things organized.
    - See `src/components/users` for an example

### Actions

Actions are declared inside of `src/actions.js`, which brings in `src/components/actions.js` and extends base app actions. Component actions should exist inside of a component folder and be brought into the main component actions. Nested components should follow the same schema. For example:

```
├── src
│   ├── actions.js
│   ├── components
│   │   ├── actions.js
│   │   └── users
│   │       ├── actions.js
│   │       ├── auth
│   │       │   └── actions.js
│   │       ├── index.js
│   │       └── user
│   │           └── actions.js
```

Actions would follow the following schema:

##### `src/actions.js`

```js
import ComponentActions from './components/actions';

// First actions function takes no parent actions
// Only takes stream and state
export default (stream, state) => {

    // Set generic actions
    const actions = {

        aGlobalAction: () => {},
        someOtherAction: () => {}
    };

    // Pass stream, state, actions to child actions
    return Object.assign(actions, ComponentActions(stream, state, actions));
};

```

##### `src/components/actions.js`

```js
import UsersActions from './components/users/actions';

export default (stream, state, actions) => ({

    someComponentAction: () => {},
    ...UsersActions(stream, state, actions)
});
```


##### `src/components/users/actions.js`

```js
import UserActions from './components/users/user/actions';
import AuthActions from './components/users/auth/actions';

export default (stream, state, actions) => ({

    getAllUsers: () => {},
    user: { ...UserActions(stream, state, actions) },
    auth: { ...AuthActions(stream, state, actions) }
});
```


### SASS Structure

```bash
└── src
    ├── _vars.sass
    ├── app.sass
    ├── base
    │   ├── base.sass
    │   ├── buttons.sass
    │   ├── code.sass
    │   ├── forms.sass
    │   ├── grid.sass
    │   ├── index.sass
    │   ├── spacing.sass
    │   ├── typography.sass
    │   └── utils.sass
    ├── components
    │   ├── example
    │   │   └── style.sass
    │   ├── index.sass
    ├── mixins
    │   ├── button.sass
    │   ├── columns.sass
    └── └── index.sass
```

Base styles belong in `src/base` and are declared inside of `src/base/index.sass`. This keeps the main `src/app.sass` small, and declarations scoped to base folder.

Mixins belong in `src/mixins` folder and are declared inside `src/mixins/index.sass` for the same reasons.

Components' styles are stored in `src/components/{componentName}/style.sass`. This keeps all the component's styles in 1 place and maintains a separation of concerns. Those files are brought into `src/components/index.sass`.

## TODO
- [x] Router mechanism
- [ ] Form states
- [ ] Button states
- [ ] Setup tests
- [ ] Improve documentation
- [ ] Create site