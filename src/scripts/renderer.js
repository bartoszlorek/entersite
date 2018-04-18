const path = require('path')
const glob = require('glob')

const hbs = require('handlebars')
const createLoader = require('./loader')
const template = require('./template')

const { get } = require('lodash')

hbs.registerHelper('fn', (name, options) => {
    let { root } = options.data

    let func = root.local && root.local[name]
    if (typeof func !== 'function') {
        return ''
    }
    return func(root) || ''
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
            info,
            config
        )
        return hbs.compile(template(filepath))(data)
    }
}
