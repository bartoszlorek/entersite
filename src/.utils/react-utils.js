import { get, isPlainObject } from 'lodash'

export function choose(path, cases) {
    if (isPlainObject(cases)) {
        return object => {
            let value = get(object, path)
            return cases[String(value)]
        }
    }
    return object => {
        let value = get(object, path)
        return value && cases
    }
}

export function bind(context, methods) {
    let index = methods != null ? methods.length : 0

    while (index) {
        let name = methods[--index]
        if (context[name] !== undefined) {
            context[name] = context[name].bind(context)
        }
    }
}

export function omit(object, props = []) {
    if (object == null) {
        return null
    }
    if (props == null || !props.length) {
        return object
    }
    let index = -1
    const iterable = Object.keys(object)
    const length = iterable.length
    const result = {}

    while (++index < length) {
        let prop = iterable[index]
        if (props.indexOf(prop) < 0) {
            result[prop] = object[prop]
        }
    }
    return result
}

export function transform(object, props) {
    if (object == null) {
        return null
    }
    if (props == null) {
        return object
    }
    let index = -1
    const iterable = Object.keys(object)
    const length = iterable.length
    const result = {}

    while (++index < length) {
        let prop = iterable[index]
        if (props[prop] !== null) {
            let newProp = props[prop] !== undefined ? props[prop] : prop
            result[newProp] = object[prop]
        }
    }
    return result
}

export function createMemo(memo = {}) {
    return (name, callback, force) => {
        if (memo[name] === undefined || force) {
            memo[name] = callback
        }
        return memo[name]
    }
}
