// https://router5.js.org/guides/router-options
export const routerOptions = {
    allowNotFound: false,
    autoCleanUp: true,
    defaultRoute: '/',
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
    useHash: true,
    hashPrefix: '',
    base: '/',
    preserveHash: true,
    mergeState: false
};

