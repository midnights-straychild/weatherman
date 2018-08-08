/* jshint node: true, esversion: 6 */
const path = require('path');
const webpack = require('webpack');
// `CheckerPlugin` is optional. Use it if you want async error reporting.
// We need this plugin to detect a `--watch` mode. It may be removed later
// after https://github.com/webpack/webpack/issues/3460 will be resolved.
const {CheckerPlugin} = require('awesome-typescript-loader');

module.exports = {
    //context: __dirname + '/src',
    entry: __dirname + '/src/js/index.ts',
    module: {
        rules: [
            {
                test: /\.sass$/,
                use: 'fast-sass-loader'
            },
            {
                test: /\.tsx?$/,
                use: 'awesome-typescript-loader'
            }
        ]
    },
    plugins: [
        new CheckerPlugin(),
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.jQuery': 'jquery'
        })
    ],
    resolve: {
        descriptionFiles: ['package.json'],
        modules: ['node_modules'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.css']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'static')
    },
    devtool: 'source-map'
};