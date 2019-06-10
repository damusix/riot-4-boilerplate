// Using router5 as router
import { createRouter } from 'router5';
import BrowserPlugin from 'router5-plugin-browser';
import LinkInterceptor from 'router5-link-interceptor';

import Routes from './routes';
import {
    routerOptions,
    browserPluginOptions,
    linkInterceptorOptions
} from './options';

const router = createRouter(Routes, routerOptions);

router.usePlugin(BrowserPlugin(browserPluginOptions));
router.usePlugin(LinkInterceptor(linkInterceptorOptions));

export default router;