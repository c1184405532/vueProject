
/*module.exports = {
    chainWebpack: config => {
      config.module
        .rule('css')
          .test(/\.css$/)
          .oneOf('vue')
          .resourceQuery(/\?vue/)
          .use('px2rem')
            .loader('px2rem-loader')
            .options({
              remUnit: 192
            })
    }
  }
*/
const px2rem = require('postcss-px2rem')

// 配置基本大小
const postcss = px2rem({
  // 基准大小 baseSize，需要和rem.js中相同
  remUnit: 192, custom: {70: ['index']}
})

// 使用等比适配插件
// module.exports = {
//     css: {
//         loaderOptions: {
//           postcss: {
//             plugins: [
//               postcss
//             ]
//           }
//         }
//       },
//     chainWebpack: config => {
//         config.module
//         .rule('sass')
//         .oneOf('vue')
//         .use('px2rem-loader')
//         .loader('px2rem-loader')
//         .before('postcss-loader') // this makes it work.
//         .options({ remUnit: 192, remPrecision: 8 })
//         .end()
//     }
//   }