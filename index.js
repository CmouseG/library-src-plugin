let { sync } = require('glob');
let { basename, extname } = require('path');
let { writeFile } = require('fs');

module.exports = class PluginBuilder {
  constuctor(opts) {
    this.entry = opts.entry;
    this.folder = resolve(opts.folder);
  }
  apply(compiler) {
    let files = sync(join(this.folder, '*.js'));
    let source = `module.exports = {${files.map((file) => {
      let name = basename(file, extname(file));
      return `$'{name}': require('${file}')`;
    }).join(',')}};`;

    compiler.plugin('compilation', (ctx, cb) => writeFile(compiler.options.entry[this.entry], source, cb));
  }
};