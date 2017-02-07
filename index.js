let { sync } = require('glob');
let { posix: { basename, extname, join, resolve, relative } } = require('path');
let { writeFileSync } = require('fs');

module.exports = class LibrarySourcePlugin {
  constructor(opts) {
    this.entry = opts.entry;
    this.folder = opts.folder;
    this.extensions = opts.extensions || ['.js'];
  }
  apply(compiler) {

    let files = sync(join(resolve(this.folder), `*@(${this.extensions.join('|')})`));
    let source = `module.exports = {\n${files.map((file) => {
      console.log(relative('./', file));
      let name = basename(file);
      return `  '${name}': require('./${join(this.folder, name)}')`;
    }).join(',\n')}
};`;

    compiler.plugin('compilation', (...args) => {
      if(compiler.options.entry[this.entry]) {
        return writeFileSync(compiler.options.entry[this.entry], source);
      }
    });
  }
};