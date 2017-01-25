const webpack = require('webpack')
const path = require('path')

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './index.js',
  output: {
    library: 'RRC',
    libraryTarget: 'umd'
  },
  externals: {
    react: {
      global: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-router': {
      global: 'ReactRouter'
    }
  },
  module: {
    rules: [
      { 
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
