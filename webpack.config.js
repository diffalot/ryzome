const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  target: 'web',
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    liveReload: false,
    index: './index.html'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'ryzo.me'
    })
  ],
  resolve: {
    alias: {
      fs: 'graceful-fs',
      'sodium-native': '@geut/sodium-javascript-plus',
      'sodium-universal': '@geut/sodium-javascript-plus',
      hyperswarm: 'hyperswarm-web'
    }
  },
  output: {
    filename: 'ryzome.js',
    path: path.resolve(__dirname, 'dist')
  }
}
