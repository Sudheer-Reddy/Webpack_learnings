const path = require('path');

/**
  * Eslint config for Webpack
  */
  exports.javascriptLinting = ({include, exclude, options}) => ({
    module: {
        rules: [
            {
              test: /\.js$/,
              enforce: 'pre',
              options: {
                  emitError: false,
                  emitWarning: false
              },
              loader: 'eslint-loader'
            }
        ]
    }
});

exports.fileLoader = ({include, exclude, options}) => ({
    module: {
        rules: [
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: 'html-loader',
                query: {
                  name: '[name].[ext]',
                },
            },
        ]
    }
});

/**
 * Development server config for Webpack
 * Note:- Use only in development mode
 */
exports.devServer = ({host, port} = {}) => ({
    devServer: {
        historyApiFallback: true,
        // stats: 'errors-only',
        host,
        port,
        overlay: {
            errors: false,
            warnings: false
        }
    }
 });