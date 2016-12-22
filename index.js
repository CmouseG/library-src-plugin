let { sync } = require('glob');
let { basename, extname, join, resolve } = require('path');
let { writeFile } = require('fs');

module.exports = class LibrarySourcePlugin {
  constructor(opts) {
    this.entry = opts.entry;

    this.folder = resolve(opts.folder);
  }
  apply(compiler) {
    console.log(compiler.options);
    let files = sync(join(this.folder, '*.js'));
    let source = `module.exports = {${files.map((file) => {
      let name = basename(file, extname(file));
      return `'${name}': require('${file}')`;
    }).join(',')}};`;

    compiler.plugin('compilation', (ctx, cb) => writeFile(compiler.options.entry[this.entry], source, cb));
  }
};