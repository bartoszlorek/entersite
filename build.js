const fse = require('fs-extra')
const path = require('path')
const glob = require('glob')

const renderer = require('./src/scripts/renderer')
const config = require('./config')
const { src, public } = config.path

const render = renderer(config, {
    global: `${src}/global/*.json`
})

fse.emptyDirSync(public)
fse.copy(`${src}/assets`, `${public}/assets`)

glob('**/*.hbs', { cwd: `${src}/views` }, (error, files) => {
    files.forEach(file => {
        const { dir, name } = path.parse(file)
        const destPath = path.join(public, dir)
        fse
            .mkdirs(destPath)
            .then(() => render(`${src}/views/${file}`))
            .then(body => render(`${src}/layout.hbs`, { body }))
            .then(html => fse.writeFile(`${destPath}/${name}.html`, html))
            .catch(err => console.error(err))
    })
})
