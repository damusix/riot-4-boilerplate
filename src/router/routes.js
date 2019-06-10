// https://router5.js.org/guides/defining-routes
export default [
    { name: 'home', path: '/' },
    { name: 'try-this', path: '/try-this' },
    { name: 'comes-with', path: '/comes-with' },
    { name: 'example', path: '/example' },
    {
        name: 'auth',
        path: '/auth',
        children: [
            { name: 'login', path: '~/login'},
            { name: 'register', path: '~/register'},
            { name: 'reset-password', path: '~/password/reset'},
            { name: 'reset-request', path: '~/password/request-reset'},
        ]
    },
    {
        name: 'users',
        path: '/users',
        children: [
            { name: 'view', path: '/:id' },
            { name: 'list', path: '/list' }
        ]
    }
];