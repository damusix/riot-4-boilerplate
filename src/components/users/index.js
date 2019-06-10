import * as riot from 'riot';

import AuthLogin from './auth/login.riot';
import AuthRegister from './auth/register.riot';

riot.register('login', AuthLogin);
riot.register('register', AuthRegister);