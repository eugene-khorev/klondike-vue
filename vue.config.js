const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  css: {
    sourceMap: true,
  },
  devServer: {
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  configureWebpack: {
    devtool: 'source-map',
    plugins: process.env.NODE_ENV === 'production' ? [new BundleAnalyzerPlugin()] : [],
  },
}
