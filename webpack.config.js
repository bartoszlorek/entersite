const path = require('path')
const buildIndex = require('./index.build')

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
    }
}
