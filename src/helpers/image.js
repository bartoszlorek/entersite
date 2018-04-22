const Handlebars = require('handlebars')
const escAttrs = require('../.utils/esc-attrs')

module.exports = (image, options) => {
    const { root, images } = options.data.root.global

    let attrs = escAttrs({
        src: root + images + image.filename,
        width: image.width,
        height: image.height,
        'data-group': image.group
    })
    return new Handlebars.SafeString(`<img ${attrs}/>`)
}
