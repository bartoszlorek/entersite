const fs = require('fs')
const hbs = require('handlebars')

const defaults = {
    entry: './src/index.hbs',
    output: './public/index.html',
    encoding: 'utf8',
    context: {}
}

module.exports = function(spec) {
    const config = Object.assign({}, defaults, spec)
    const { entry, output, encoding, context } = config

    // render template
    const source = fs.readFileSync(entry, encoding)
    const render = hbs.compile(source)
    fs.writeFileSync(output, render(context), encoding)
}
