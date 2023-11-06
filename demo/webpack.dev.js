const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const WebpackNotifierPlugin = require('webpack-notifier')
const webpack = require('webpack');
const postcssImport = require('postcss-import')
const postcssPreset = require('postcss-preset-env')

module.exports = {
    devtool: 'source-map',
    mode: 'development',
    entry: "./demo/src/index.js",
    output: {
        path: path.resolve(__dirname, './demo'),
        filename: "index_bundle.js"
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['node_modules']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.(css)$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {}
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            sourceMap: true,
                            "plugins": () => [postcssImport(), postcssPreset()]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new WebpackNotifierPlugin(),
        new HtmlWebPackPlugin({
            publicPath: '/',
            template: './demo/index.html',
            alwaysWriteToDisk: false,
            title: 'Direct Drop Area'
        }),
        new webpack.EnvironmentPlugin({
            APP_NAME: "direct-drop-area",
            NODE_ENV: 'development',
            BABEL_ENV: 'development',
            ENABLE_REACTOPT: false
        })
    ],
    devServer: {
        port: 3001
    }
}
