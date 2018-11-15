/* jshint node: true, esversion: 6 */
const path = require('path');
const webpack = require('webpack');
// `CheckerPlugin` is optional. Use it if you want async error reporting.
// We need this plugin to detect a `--watch` mode. It may be removed later
// after https://github.com/webpack/webpack/issues/3460 will be resolved.
const {CheckerPlugin} = require('awesome-typescript-loader');
const PolyfillInjectorPlugin = require('webpack-polyfill-injector');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    //context: __dirname + '/src',
    devtool: "source-map",
    entry: {
        main: `webpack-polyfill-injector?${JSON.stringify({
            modules: [
                __dirname + '/src/ts/main.ts',
            ] // list your entry modules for the `app` entry chunk
        })}!` // don't forget the trailing exclamation mark!
    },
    module: {
        rules: [
            // {
            //     test: /\.ts$/,
            //     enforce: 'pre',
            //     loader: 'tslint-loader',
            //     options: {
            //         configFile: './tslint.json',
            //         tsConfigFile: './tsconfg.json',
            //         emitErrors: false,
            //         typeCheck: false,
            //         failOnHint: false,
            //         fix: true,
            //         formatter: 'pmd',
            //         fileOutput: {
            //             dir: './reports/tslint/',
            //             ext: 'xml',
            //             clean: true,
            //         }
            //     }
            // },
            {
                test: /.sass$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    },
                    {
                        loader: 'resolve-url-loader'
                    },
                    {
                        loader: 'fast-sass-loader'
                    }
                ]
            },
            {
                test: /\.tscss$/,
                use: [
                    'css-loader',
                    {
                        loader: 'fast-sass-loader',
                        options: {
                            includePaths: ['src/ts/modules/**/*']
                        }
                    }
                ]
            },
            {
                test: /\.pug/,
                use: ['pug-loader']
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
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    resolve: {
        descriptionFiles: ['package.json'],
        modules: ['node_modules', 'src/ts/modules'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.sass', '.tsass', '.pug']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'static')
    }
};