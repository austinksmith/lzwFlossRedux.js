const path = require('path');
const webpack = require('webpack');

const web = {
  target: 'web',
  devtool: 'sourcemap',
  context: path.resolve(__dirname, 'src'),
  entry: [
    './lzwFlossRedux'
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'lzwFlossRedux.web.min.js',
    library: 'lzwFlossRedux',
    libraryTarget: 'var'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin,
    new webpack.optimize.UglifyJsPlugin({
        include: /\.min\.js$/,
        minimize: true
    }),
  ],
  module: {
    loaders: [
      {
        test: [/\.js?$/],
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'babel',
        query: {
          presets: ['es2015'],
        }
      }
    ]
  }
};

const node = {
  target: 'node',
  devtool: 'sourcemap',
  context: path.resolve(__dirname, 'src'),
  entry: [
    './lzwFlossRedux'
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'lzwFlossRedux.node.min.js',
    library: 'lzwFlossRedux',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin,
    new webpack.optimize.UglifyJsPlugin({
        include: /\.min\.js$/,
        minimize: true
    }),
  ],
  module: {
    loaders: [
      {
        test: [/\.js?$/],
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'babel',
        query: {
          presets: ['es2015'],
        }
      }
    ]
  }
};

module.exports = [
  web,
  node
];