const path = require('path')
const glob = require('glob')

const template = require('./template')
const { render } = require('mustache')

const blankLine = /^\s*[\r\n]/gm

module.exports = (configObject, dataPattern) => {
    let globalData = {}

    glob.sync(dataPattern).forEach(file => {
        let { name } = path.parse(file)
        globalData[name] = require(path.resolve(file))
    })

    return (path, pageData) => {
        let view = Object.assign(
            configObject,
            globalData,
            pageData
        )
        let html = render(template(path), view)
        return html.replace(blankLine, '')
    }
}
