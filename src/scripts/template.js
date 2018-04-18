const fs = require('fs')
const BOM = /^\uFEFF/

module.exports = (path) => fs
    .readFileSync(path)
    .toString()
    .replace(BOM, '')
