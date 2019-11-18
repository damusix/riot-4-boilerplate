import * as riot from 'riot';

import AppNav from './nav/nav.riot';

import Example from './example/example.riot';
import ComesWith from './example/comes-with.riot';
import TryThis from './example/try-this.riot';
import SomeForm from './someForm.riot';

import './users';

riot.register('app-nav', AppNav);
riot.register('example', Example);
riot.register('comes-with', ComesWith);
riot.register('try-this', TryThis);
riot.register('some-form', SomeForm);