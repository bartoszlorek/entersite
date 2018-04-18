const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')

const config = require('../../config')
const renderer = require('./renderer')
const { src, public } = config.path

const render = renderer(config, [`${src}/global/*.json`])

fs.emptyDirSync(public)
fs.copy(`${src}/assets`, `${public}/assets`)

glob('**/*.hbs', { cwd: `${src}/views` }, (error, files) => {
    files.forEach(file => {
        const { dir, name } = path.parse(file)
        const destPath = path.join(public, dir)
        fs
            .mkdirs(destPath)
            .then(() => render(`${src}/views/${file}`))
            .then(body => render(`${src}/layout.hbs`, { body }))
            .then(html => fs.writeFile(`${destPath}/${name}.html`, html))
            .catch(err => console.error(err))
    })
})
