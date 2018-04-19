const path = require('path')
const glob = require('glob')
const { map } = require('lodash')

const merge = (a, b) => Object.assign({}, a, b)

/*
{
    prop1: {
        pattern: info => string,
        extract: true
    },
    prop2: {
        pattern: string,
    },
    prop3: string
}
*/

function parseLoaders(loaders) {
    return map(loaders, (spec, prop) => {
        let type = spec != null && typeof spec
        if (type === 'string') {
            return {
                prop,
                pattern: spec,
                extract: false,
                deferred: false
            }
        }

        if (type === 'object') {
            let { pattern, extract } = spec
            return {
                prop,
                pattern: pattern || null,
                extract: !!extract,
                deferred: typeof pattern === 'function'
            }
        }
    }).filter(a => a !== undefined)
}

function createExecutor(data) {
    return info => loader => {
        let { prop, pattern, extract, deferred } = loader

        if (deferred) {
            pattern = pattern(info)
        }
        if (typeof pattern !== 'string') {
            return
        }
        glob.sync(pattern).forEach(file => {
            let value = require(path.resolve(file))

            if (data[prop] === undefined) {
                data[prop] = {}
            }
            if (extract) {
                data[prop] = merge(data[prop], value)
            } else {
                let { name } = path.parse(file)
                data[prop][name] = merge(data[prop][name], value)
            }
        })
    }
}

function createLoader(spec) {
    if (spec == null) {
        return () => null
    }
    const data = {}
    const execute = createExecutor(data)
    const loaders = parseLoaders(spec)

    loaders.filter(a => !a.deferred).forEach(execute(null))

    return filepath => {
        let info = path.parse(filepath)
        loaders.filter(a => a.deferred).forEach(execute(info))
        return data
    }
}

module.exports = createLoader
