const __DEV__ = process.env.NODE_ENV === 'development'

module.exports = (api) => {
  api.cache(false)

  return {
    env: {
      production: {
        presets: ['babel-preset-minify']
      }
    },
    presets: [
      '@babel/preset-env',
      '@babel/preset-flow',
      [
        '@babel/preset-react',
        {
          development: __DEV__
        }
      ]
    ],
    plugins: [
      // Gets ignored in production.
      'react-hot-loader/babel',
      'babel-plugin-dev-expression',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-dynamic-import',
      'babel-plugin-jsx-control-statements',
      '@babel/plugin-transform-runtime',
      [
        'babel-plugin-react-css-modules',
        {
          generateScopedName: '[local]-[hash:base64:5]',
          handleMissingStyleName: 'warn',
          webpackHotModuleReloading: true,
          context: '.${PWD}/src',
          exclude: 'node_modules'
        }
      ],
      [
        'babel-plugin-module-resolver',
        {
          root: ['./src'],
          alias: {
            '#src': './src',
            '#components': './src/components',
            '#utils': './src/utils',
            '#types': './src/types',
          }
        }
      ]
    ]
  }
}
