# library-src-plugin

An `es2015` webpack plugin that uses the `webpack.config` to find the specified module `entry` point and automatically generates an `index.js` exporting everything in the specified folder.

# Usage

```javascript
let LibrarySrcPlugin = require('library-src-plugin');

module.exports = {
  entry: {
    //this file doesn't need to exist, it will be generated for you
    'library-name': './index.js'
  },
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    library: 'library-name',
    libraryTarget: 'umd'
  },
  plugins: [
    new LibrarySrcPlugin({
      //use the library's source folder
      folder: './src',
      //this is the entry specified above
      entry: 'library-name'
    })
  ]
}
```
