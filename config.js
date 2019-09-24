const fs = require('fs');
const build = require('./build');

build({
  context: {
    assets_path: './www/images/',
    assets: require('./src/assets'),
    menu: require('./src/menu')
  }
});

fs.copyFile('./src/style.css', './public/style.css', err => {
  if (err) throw err;
});
