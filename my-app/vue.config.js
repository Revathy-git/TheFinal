module.exports = {
    devServer: {
      proxy: {
        '^/api': {
          target: 'http://localhost:3080',
          changeOrigin: true
        },
        '^/api1': {
          target: 'http://fce-u0263.us.int.genesyslab.com:5070',
          changeOrigin: true
        }
      }
    }
  }