import * as riot from 'riot';

import AuthLogin from './auth/login.riot';
import AuthRegister from './auth/register.riot';
import AuthLinks from './auth/links.riot';
import AuthRequestReset from './auth/reset-password-request.riot'
import AuthPasswordReset from './auth/reset-password.riot';

riot.register('login', AuthLogin);
riot.register('register', AuthRegister);
riot.register('auth-links', AuthLinks);
riot.register('request-reset', AuthRequestReset);
riot.register('password-reset', AuthPasswordReset);