// https://router5.js.org/guides/defining-routes
export default [
    { name: 'home', path: '/' },
    {
        name: 'users',
        path: '/users',
        children: [
            { name: 'view', path: '/:id' },
            { name: 'list', path: '/list' }
        ]
    }
];