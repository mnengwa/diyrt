const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rootDir = path.resolve(__dirname, '..');

module.exports = merge(common, {
    mode: 'development',
    output: {
        path: rootDir + '/dist/',
        filename: '[name].js'
    },
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        port: 3000,
        stats: 'errors-only',
        historyApiFallback: true,
        contentBase: rootDir + '/assets/'
    },
    plugins: [
        new MiniCssExtractPlugin({
            ignoreOrder: false,
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
});