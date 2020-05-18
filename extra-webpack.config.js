const webpack = require("webpack");
const pkg = require("./package.json");

module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '~',
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        vendor:  {
          name: 'vendor',
          chunks: 'initial',
          priority: 10,
          enforce: true,
          test: (module, chunks) => {
            const moduleName = module.nameForCondition ? module.nameForCondition() : '';
            return /[\\/]node_modules[\\/]/.test(moduleName) && !/angular/.test(moduleName);
          }
        },
        ngbundle:  {
          name: 'ngbundle',
          chunks: 'initial',
          priority: 20,
          enforce: true,
          test: (module, chunks) => {
            const moduleName = module.nameForCondition ? module.nameForCondition() : '';
            console.log('Angular moduleName : ')
            console.log(moduleName)
            return /[\\/]node_modules[\\/]/.test(moduleName) && /angular/.test(moduleName);
          }
        }
      }
    }
  }
};
