const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path')
const webpack = require('webpack')

let extractCSS = new ExtractTextPlugin('styles/[name].css');

module.exports = {
    entry: {
        app: './scripts/index.js',
        vendor: [
            'react',
            'react-dom',
            'react-redux',
            'react-router',
            'react-router-redux',
            'redux',
            'redux-thunk',
            'd3'
        ],
        polyfill: ['babel-polyfill']
    },
    context: path.resolve(__dirname, 'src'),
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            },
            {test: /\.scss$/i, loader: extractCSS.extract(['css', 'sass'])}
        ]
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.[name].js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js'
        }),
        extractCSS
    ],
    resolve: {
        extensions: ['.js', '.scss']
    }

}

