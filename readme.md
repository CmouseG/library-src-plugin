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

# MIT LICENSE
```
Copyright (c) 2016 Joshua Tenner

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```