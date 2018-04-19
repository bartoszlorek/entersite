const path = require('path')
const glob = require('glob')
const hbs = require('handlebars')
const { get } = require('lodash')

const createLoader = require('./loader')
const template = require('./template')

hbs.registerHelper('fn', (name, options) => {
    let { root } = options.data,
        method = get(root, name)
    if (typeof method === 'function') {
        return method(root)
    }
    return ''
})

module.exports = (config, loaders) => {
    let load = createLoader(loaders)
    return (filepath, context) => {
        let info = {
            view: path.parse(filepath)
        }
        let data = Object.assign(
            load(filepath),
            context,
            config,
            info
        )
        return hbs.compile(template(filepath))(data)
    }
}
