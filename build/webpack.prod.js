const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rootDir = path.resolve(__dirname, '..');

module.exports = merge(common, {
    mode: 'production',
    output: {
        publicPath: 'dist/',
        path: rootDir + '/dist/',
        filename: 'js/[name].[hash].js',
        chunkFilename: 'js/[name].[hash].js',
    },
    plugins: [
        new MiniCssExtractPlugin({
            ignoreOrder: false,
            filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[name].[hash].css',
        }),
    ]
});