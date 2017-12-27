const path = require('path');

module.exports = {

    entry: './index.js',
    output: {
        path: path.resolve('./dist'),
        filename: 'bundle.js'
    },
    target: 'node',
    node: {
        console: false,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: ['babel-loader']
        }]
    }
}