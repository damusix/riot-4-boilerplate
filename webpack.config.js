const Path = require('path');
const CssExtract = require('mini-css-extract-plugin');

const paths = {
    app: Path.resolve(__dirname, 'src'),
    public: Path.resolve(__dirname, 'public')
};

const mode = ['production', 'development'].includes(process.env.NODE_ENV)
    ? process.env.NODE_ENV
    : 'development';

module.exports = {
    entry: [
        '@babel/polyfill',
        Paths.resolve(paths.app, 'index.js')
    ],
    devServer: {
        historyApiFallback: {
            index: 'index.html'
        },
        hot: true
    },
    resolve: {

        alias: {
            '~': paths.app,
            '@': Path.resolve(paths.app, 'components'),
            '+': Path.resolve(paths.app, 'shared'),
            '#': Path.resolve(paths.app, 'utils')
        },
    },
    output: {
        path: paths.public,
        publicPath: '/public/',
        filename: 'app.js'
    },
    mode,
    devtool: 'source-map',
    plugins: [
        new CssExtract({
            filename: 'app.css'
        })
    ],
    module: {
        rules: [{
            test: /\.riot$/,
            exclude: /node_modules/,
            use: [{
                loader: '@riotjs/webpack-loader',
                options: { hot: true }
            }]
        },
        {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    "targets": "> 0.25%, not dead"
                                }
                            ]
                        ]
                    }
                }
        },
        {
            test: /\.s?(c|a)ss$/,
            use: [
                {
                    loader: CssExtract.loader,
                    options: {
                        hmr: true
                    }
                },
                // "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS, using Node Sass by default
            ]
        }]
    }
}