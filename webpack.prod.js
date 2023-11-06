const path = require('path')
const webpack = require('webpack')
const postcssImport = require('postcss-import')
const postcssPreset = require('postcss-preset-env')

module.exports = [
  {
    mode: 'production',
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, './es'),
      filename: 'index.js',
      libraryTarget: 'commonjs',
      umdNamedDefine: false
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    externals: [
      /^react$/,
      /^react-dom$/,
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
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
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                modules: true,
                importLoaders: 1,
                sourceMap: true,
                plugins: () => [postcssImport(), postcssPreset()]
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'production',
        BABEL_ENV: 'production',
        YCS: 'ycscommonsus',
        APP_NAME: process.env.APP_NAME || 'testapp',
        STACK: process.env.STACK || 'c',
        IS_CORE_APP: false
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
          BABEL_ENV: JSON.stringify('production')
        }
      })
    ]
  }
]
