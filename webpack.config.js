const path = require('path')
const HandlebarsPlugin = require('handlebars-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/public/assets'),
        filename: 'scripts.js'
    },
    plugins: [
        new HandlebarsPlugin({
            entry: path.join(__dirname, '/src/views/*.hbs'),
            output: path.join(__dirname, '/public/[name].html'),
            data: require('./src/data'),
            partials: [
                path.join(__dirname, '/src/partials/**/*.hbs')
            ]
        })
    ]
}
