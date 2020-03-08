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
  },
}
