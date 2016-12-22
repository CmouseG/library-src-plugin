let { sync } = require('glob');
let { posix: { basename, extname, join, resolve, relative } } = require('path');
let { writeFileSync } = require('fs');

module.exports = class LibrarySourcePlugin {
  constructor(opts) {
    this.entry = opts.entry;
    this.folder = opts.folder;
  }
  apply(compiler) {

    let files = sync(join(resolve(this.folder), '*.js'));
    let source = `module.exports = {\n${files.map((file) => {
      let name = basename(file, extname(file));
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