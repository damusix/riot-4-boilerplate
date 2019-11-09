// Using router5 as router
import { createRouter } from 'router5';
import BrowserPlugin from 'router5-plugin-browser';
import LinkInterceptor from 'router5-link-interceptor';
import { getStream } from 'riot-meiosis';

import Routes from './routes';

import {
    routerOptions,
    browserPluginOptions,
    linkInterceptorOptions
} from './options';

import WithRouter from './withRouter';

const router = createRouter(Routes, routerOptions);

router.usePlugin(BrowserPlugin(browserPluginOptions));
router.usePlugin(LinkInterceptor(linkInterceptorOptions));

const stream = getStream();

export function routerStart() {

    Router.start((_, route) => {

        stream.push({ route });
    });
};

export function navigate(...args) {

    Router.navigate(...args);
};


export default router;
export const withRouter = WithRouter;