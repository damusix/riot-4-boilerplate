// https://router5.js.org/guides/router-options
export const routerOptions = {
    allowNotFound: false,
    autoCleanUp: true,
    defaultRoute: '404',
    defaultParams: {},
    queryParams: {
        arrayFormat: 'default',
        nullFormat: 'default',
        booleanFormat: 'default'
    },
    queryParamsMode: 'default',
    trailingSlashMode: 'default',
    strictTrailingSlash: false,
    caseSensitive: false
};

// https://github.com/router5/router5/tree/master/packages/router5-plugin-browser
export const browserPluginOptions = {
    forceDeactive: true,
    mergeState: false,

    // // Uncomment the following to use hash router, eg: "#/login"
    // useHash: true,
    // hashPrefix: '',
    // base: '/',
    // preserveHash: true,
};

// https://github.com/jas-chen/router5-link-interceptor
// https://router5.js.org/guides/navigating
export const linkInterceptorOptions = {
    push: true
}