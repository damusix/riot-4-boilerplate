const Path = require('path');
const CssExtract = require('mini-css-extract-plugin');

module.exports = {
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
        path: Path.resolve(__dirname, 'public'),
        publicPath: '/public/',
        filename: 'app.js'
    },
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
                options: {
                    hot: false, // set it to true if you are using hmr
                    // add here all the other @riotjs/compiler options riot.js.org/compiler
                    // template: 'pug' for example
                }
            }]
        },
        {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
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