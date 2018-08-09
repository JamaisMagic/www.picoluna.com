module.exports = {
  lintOnSave: false,
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/sub/home/dist/'
    : '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://qa.www.picoluna.com',
        ws: false,
        changeOrigin: true
      }
    }
  }
};
