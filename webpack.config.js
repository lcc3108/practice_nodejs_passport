const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './src/index.ts',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs',
  },
  module: { rules: [{ test: /\.(j|t)s$/, use: { loader: 'babel-loader', options: { babelrc: true } } }] },
  resolve: { extensions: ['.ts', '.js', '.json'], alias: { '@': path.join(__dirname, 'src') } },
  node: {
    __dirname: true,
  },
};
