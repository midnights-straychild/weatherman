const path = require('path');

module.exports = {
  entry: './static/js/src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'static')
  }
};