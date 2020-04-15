
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
	remUnit: 192, custom: { 70: ['index'] }
})

//使用等比适配插件
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
//         .rule('less')
//         .oneOf('vue')
//         .use('px2rem-loader')
//         .loader('px2rem-loader')
//         .before('postcss-loader') // this makes it work.
//         .options({ remUnit: 192, remPrecision: 8 })
//         .end()
//     }
//   }
module.exports = {

	css: {
		loaderOptions: {
			//rem转换
			// postcss: {
			// 	plugins: [
			// 		require('postcss-pxtorem')({ // 把px单位换算成rem单位
			// 			rootValue: 37.5, // 换算的基数(设计图750的根字体为32)
			// 			selectorBlackList: ['weui', 'mu'], // 忽略转换正则匹配项
			// 			propList: ['*']
			// 		})
			// 	]
			// }
			css: {
				requireModuleExtension: false
			},
			postcss: {
				//vw装换
				plugins: [
					require('postcss-import'),
					require('postcss-url'),
					require('postcss-aspect-ratio-mini'),
					require('postcss-write-svg')({utf8: false}),
					require('postcss-cssnext'),
					require('postcss-px-to-viewport')({
						viewportWidth: 750,     // (Number) The width of the viewport.
						viewportHeight: 1334,    // (Number) The height of the viewport.
						unitPrecision: 3,       // (Number) The decimal numbers to allow the REM units to grow to.
						viewportUnit: 'vw',     // (String) Expected units.
						selectorBlackList: ['.ignore', '.hairlines','.van'],  // (Array) The selectors to ignore and leave as px.
						minPixelValue: 1,       // (Number) Set the minimum pixel value to replace.
						mediaQuery: false       // (Boolean) Allow px to be converted in media queries.
					}),
					require('postcss-viewport-units'),
					require('cssnano')({
						preset: "advanced",
						autoprefixer: false,
						"postcss-zindex": false
					}),
				],
			}
		},

	},
}

