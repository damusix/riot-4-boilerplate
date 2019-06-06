# Riot 4 Boilerplate

Starting point for working with Riot 4. This boilerplate comes with:

- SASS boilerplate based on [Milligram IO](http://milligram.io)
- [BiancoJS](https://github.com/biancojs/bianco)
- [AnimeJS](https://animejs.com)
- [Fontawesome 5](http://fontawesome.io)
- [AxiosJS](https://github.com/axios/axios)
- Streaming state management using [Erre](https://github.com/GianlucaGuarini/erre)
- Webpack Hot reloading

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

```bash
├── index.html
├── package-lock.json
├── package.json
├── public
│   └── img
├── readme.md
├── src
│   ├── _vars.sass
│   ├── actions.js
│   ├── app.riot
│   ├── app.sass
│   ├── base
│   │   ├── base.sass
│   │   ├── buttons.sass
│   │   ├── code.sass
│   │   ├── forms.sass
│   │   ├── grid.sass
│   │   ├── index.sass
│   │   ├── spacing.sass
│   │   ├── typography.sass
│   │   └── utils.sass
│   ├── components
│   │   ├── actions.js
│   │   ├── example
│   │   │   ├── actions.js
│   │   │   ├── example.riot
│   │   │   └── style.sass
│   │   ├── index.js
│   │   ├── index.sass
│   │   └── links
│   │       └── scroll.js
│   ├── index.js
│   ├── mixins
│   │   ├── button.sass
│   │   ├── columns.sass
│   │   └── index.sass
│   └── utils
│       └── index.js
└── webpack.config.js
```

### Components

Componets are declared inside of `src/components/` and, when relevant, should contain the following main items:
- `style.sass`
- `actions.js`
- `component.riot`

### Riot Templates

Riot templates should be brought into `src/components/index.js`. All riot components should be registered here as follows:

```js
import Example1 from './example1/example.riot';
import Example2 from './example2/example.riot';

riot.register('example1', Example1);
riot.register('example2', Example2);
```

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

export default (stream) => ({

    someAction: () => {},
    ...ComponentActions(stream)
});
```

##### `src/components/actions.js`

```js
import UsersActions from './components/users/actions';

export default (stream) => ({

    someComponentAction: () => {},
    ...UsersActions(stream)
});
```


##### `src/components/users/actions.js`

```js
import UserActions from './components/users/user/actions';
import AuthActions from './components/users/auth/actions';

export default (stream) => ({

    getAllUsers: () => {},
    user: { ...UserActions(stream) },
    auth: { ...AuthActions(stream) }
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
- [ ] Router mechanism
- [ ] Form states
- [ ] Button states
- [ ] Setup tests
- [ ] Improve documentation
- [ ] Create site