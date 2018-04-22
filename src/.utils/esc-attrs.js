function escAttrs(obj) {
    if (obj == null) {
        return ''
    }
    return Object.keys(obj).reduce((result, prop) => {
        if (obj[prop] != null) {
            result += `${prop}="${obj[prop]}" `
        }
        return result
    }, '')
}

module.exports = escAttrs
