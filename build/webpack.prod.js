const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rootDir = path.resolve(__dirname, '..');

module.exports = merge(common, {
    mode: 'production',
    output: {
        publicPath: 'dist/',
        path: rootDir + '/dist/',
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].js',
    },
    plugins: [
        new MiniCssExtractPlugin({
            ignoreOrder: false,
            filename: '[name].[hash].css',
            chunkFilename: '[name].[hash].css',
        }),
    ]
});