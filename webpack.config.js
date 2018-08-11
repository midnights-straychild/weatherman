/* jshint node: true, esversion: 6 */
const path = require('path');
const webpack = require('webpack');
// `CheckerPlugin` is optional. Use it if you want async error reporting.
// We need this plugin to detect a `--watch` mode. It may be removed later
// after https://github.com/webpack/webpack/issues/3460 will be resolved.
const {CheckerPlugin} = require('awesome-typescript-loader');
const PolyfillInjectorPlugin = require('webpack-polyfill-injector');

module.exports = {
    //context: __dirname + '/src',
    entry: {
        main: `webpack-polyfill-injector?${JSON.stringify({
            modules: [
                __dirname + '/src/ts/main.ts',
                __dirname + '/src/sass/main.sass',] // list your entry modules for the `app` entry chunk
        })}!` // don't forget the trailing exclamation mark!
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {
                    configFile: './tslint.json',
                    tsConfigFile: './tsconfg.json',
                    emitErrors: false,
                    typeCheck: false,
                    failOnHint: false,
                    fix: true,
                    formatter: 'pmd',
                    fileOutput: {
                        dir: './reports/tslint/',
                        ext: 'xml',
                        clean: true,
                    }
                }
            },
            {
                test: /\.sass$/,
                use: ['style-loader', 'css-loader', 'fast-sass-loader']
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
        }),
        new PolyfillInjectorPlugin({
            polyfills: [
                'Promise',
                'Array.prototype.find',
            ]
        })
    ],
    resolve: {
        descriptionFiles: ['package.json'],
        modules: ['node_modules', 'src/ts/modules'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.css']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'static')
    },
    devtool: 'source-map'
};