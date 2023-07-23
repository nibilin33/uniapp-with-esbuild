//vue.config.js
const path = require('path')
const isDevelopment = process.env.NODE_ENV == 'development'

function addEsbuild(config) {
    const {
      EsbuildPlugin
    } = require('esbuild-loader')
    const tsrule = config.module.rule('ts')
    tsrule.uses.clear()
    tsrule
      .use('esbuild-loader')
      .loader('esbuild-loader')
      .options({
        loader: 'ts',
        target: 'es2015'
      })
    // 构建时候不做类型检测
    if(!isDevelopment) {
      config.plugins.delete('fork-ts-checker')
    }else{
      // 修改teser 构建产物语法有变化, 目前先放开发模式
      config.optimization.minimizers.delete('terser');
      config.optimization
      .minimizer('esbuild')
      .use(EsbuildPlugin, [{ minify: true, css: true }]);
    }
}
module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "~@/uni.scss";
        `
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    output: {
      pathinfo: false,
    },
  },
  transpileDependencies: ['uni-simple-router'],
  chainWebpack: config => {
    const css = config.module.rule('css')
    css.uses.clear()
    css.use('fast-css-loader')
    .loader('fast-css-loader')
    addEsbuild(config);
  }
}
