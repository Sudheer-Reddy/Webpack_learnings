const path = require('path'),
HtmlWebpackPlugin = require('html-webpack-plugin'),
CopyWebpackPlugin = require('copy-webpack-plugin'),
glob = require('glob'),
PATHS = {
    app: path.join(__dirname, 'app'),
    scripts: path.join(__dirname, 'app/js'),
    assets: path.join(__dirname, 'app/assets'),
    build: path.join(__dirname, 'build'),
    node_modules: path.join(__dirname, 'node_modules')
},
merge = require('webpack-merge'),
parts = require('./webpack.parts'),
commonConfig = merge([
    {
        // Entries have to resolve to files, they rely on Node
        // Convention by default so if a directory contains *index.js*
        // It resolves to that
        entry: {
            // main: [PATHS.app + '/app.js', PATHS.scripts + '/users/controller.js'],
            main: [PATHS.app + '/app.js'].concat(glob.sync('./app/js/**/*.js')),
            vendor: [PATHS.node_modules + '/angular', PATHS.node_modules + '/angular-route']
        },
        output: {
            path: PATHS.build,
            filename: 'js/[name].bundle.js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: PATHS.app + '/index.html'
            }),
            new CopyWebpackPlugin([
                {
                    from: 'app/views',
                    to: 'views'
                },
                {
                    from: 'app/css',
                    to: 'css'
                },
                {
                    from: 'app/assets',
                    to: 'assets'
                }
            ])
        ]
    }
]);

const productionConfig = merge([]);

const developmentConfig = merge([
    parts.devServer({host: process.env.host, port: process.env.port})
]);

module.exports = (env) => {
    let config = {};

    if (env === 'development') {
        config = merge(commonConfig, developmentConfig);
    } else {
        config = merge(commonConfig, productionConfig);
    }

    return config;
};