// export files from current directory as literal object

const fs = require('fs')
const path = require('path')

const context = fs.readdirSync(__dirname)
const resolve = ['.json']

module.exports = context.reduce((output, filename) => {
    let { ext, name } = path.parse(filename)
    if (name !== 'index' && resolve.includes(ext)) {
        output[name] = require('./' + filename)
    }
    return output
}, {})
