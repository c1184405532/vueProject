

const TimeStamp = new Date().getTime();
function resolve (dir) {
	return path.join(__dirname, dir)
}
module.exports = {
	configureWebpack:{
		output:{
			// filename: `js/[name].${TimeStamp}.js`,
			// chunkFilename: `js/[name].${TimeStamp}.js`
			filename: `js/[name].${TimeStamp}.js`,
			chunkFilename: `js/[name].${TimeStamp}.js`
			
		},
	},
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

