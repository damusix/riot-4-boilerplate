// Using router5 as router
import { createRouter } from 'router5';
import BrowserPlugin from 'router5-plugin-browser';

import Routes from './routes';
import { routerOptions, browserPluginOptions } from './options';

const router = createRouter(Routes, routerOptions);

router.usePlugin(BrowserPlugin(browserPluginOptions));

export default router;