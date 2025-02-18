module.exports = {
  style: {
    sass: {
      loaderOptions: {
        implementation: require('sass'),
        sassOptions: {
          fiber: false,
        },
      },
    },
  },
}; 
