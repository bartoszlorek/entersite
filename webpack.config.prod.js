const webpack = require('webpack')
const path = require('path')
const buildIndex = require('./index.build')

// for babel-loader
process.env.NODE_ENV = 'production'

buildIndex({
    context: require('./config')
})

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'scripts.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
                include: /src/
            },
            {
                test: /\.less$/,
                include: /src/,
                loader: 'style-loader!css-loader!less-loader'
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                drop_console: true,
                drop_debugger: true
            },
            output: {
                comments: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ]
}
