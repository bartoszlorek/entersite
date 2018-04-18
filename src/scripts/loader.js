const path = require('path')
const glob = require('glob')

const PREFIX_GLOBAL = 'global'
const PREFIX_LOCAL = 'local'
const merge = (a, b) => Object.assign({}, a, b)

function createLoader(loaders) {
    if (loaders == null) {
        return () => null
    }
    let fnLoaders = [],
        data = {}

    const loadFile = (prefix, label = true) => {
        if (data[prefix] === undefined) {
            data[prefix] = {}
        }
        return file => {
            let value = require(path.resolve(file))
            if (label) {
                let { name } = path.parse(file)
                data[prefix][name] = merge(data[prefix][name], value)
            } else {
                data[prefix] = merge(data[prefix], value)
            }
        }
    }

    loaders.forEach(loader => {
        if (typeof loader === 'function') {
            fnLoaders.push(loader)
        } else {
            glob.sync(loader).forEach(loadFile(PREFIX_GLOBAL))
        }
    })

    return filepath => {
        if (fnLoaders.length > 0) {
            let info = path.parse(filepath),
                load = loadFile(PREFIX_LOCAL, false)

            fnLoaders.forEach(loader => {
                let pattern = loader(info)
                if (typeof pattern === 'string') {
                    glob.sync(pattern).forEach(load)
                }
            })
        }
        return data
    }
}

module.exports = createLoader
