const path = require('path')
const HandlebarsPlugin = require('handlebars-webpack-plugin')
const isProduction = process.argv.includes('-p')

let data = require('./src/data')

if (isProduction) {
    process.env.NODE_ENV = 'production'
    data.global = Object.assign(data.global, {
        root: './www/'
    })
}

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
            ],
            helpers: {
                dir: path.join(__dirname, '/src/helpers/**/*.js')
            }
        })
    ]
}
