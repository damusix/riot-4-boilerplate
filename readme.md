# Riot 4 Boilerplate

Starting point for working with Riot 4. This boilerplate comes with:

- SASS boilerplate based on [Milligram IO](http://milligram.io)
- [BiancoJS](https://github.com/biancojs/bianco)
- [AnimeJS](https://animejs.com)
- [Fontawesome 5](http://fontawesome.io)
- [AxiosJS](https://github.com/axios/axios)
- [Final Form](https://final-form.org/) + [Riot Final Form](https://github.com/damusix/riot-final-form)
- [Riot Meiosis](https://github.com/damusix/riot-meiosis)
- [Riot Route]((https://github.com/riot/route/tree/dev).)
- Webpack Hot reloading
- [Jest](https://jestjs.io/)

## Table of Contents

* [Usage](#usage)
* [Shortcuts](#shortcuts)
* [Structure](#structure)
    * [State Management](#state-management)
    * [Router](#router)
    * [Components](#components)
    * [Actions](#actions)
    * [SASS Structure](#sass-structure)
    * [Tests](#tests)
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

## Shortcuts

- `~/*`
    - `src/*`
- `+/*`
    - `src/shared/*`
- `@/*`
    - `src/components/*`
- `#/*`
    - `src/utils/*`

```js

// "~" is "./src"
import Store from "~/store"

// "+" is "./src/shared"
import Alerts from "+/alerts/Alerts"

// "@" is "./src/components"
import TestStuff from "@/test.riot";

// "#" is "./src/utils"
import KeyCodes from "#/keycodes";
```

## Structure

### State Management

State is initialized in `src/store.js` and uses [riot-meiosis](https://github.com/damusix/riot-meiosis).

### Router

Router is based on [riot route (dev branch)](https://github.com/riot/route/tree/dev).

### Forms and Form Management

Forms can be handled using `final-form` with `riot-final-form`. And example is shown in `src/components/someForm.riot`. Check out [Riot Final Form](https://github.com/damusix/riot-final-form) readme for more information on how to use it.

### Components

Componets are declared as folders inside of `src/components/` and, when relevant, should contain the following main items:
- `style.sass`
- `actions.js`
- `component.riot`

The convention this implementation is following is as follows:
- Keep all things related to the component inside the component folder, including styles and actions
- Register components in `src/components/index.js`
    - If there ever is a component group that clutters `src/component/index.js`, then a more appropriate flow would be to use register inside that component's `index.js`.
    - See `src/components/users` for an example

### Actions

Actions are created on a per-component basis (if necessary) and simply read state or push to state stream.

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

### Tests

Test with `Jest` using `jsdom`. See `src/__tests__/store.js` for an example of module tests and `src/components/__tests__/test.riot.js` for an example of component tests.

## TODO
- [x] Router mechanism
- [x] Form states
- [x] Button states
- [x] Setup tests
- [x] Write tests for current workflow
- [ ] Improve documentation
- [ ] Create site