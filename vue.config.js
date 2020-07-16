

const timeStamp = new Date().getTime();
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
	configureWebpack:{
		output:{
			// filename: `js/[name].${timeStamp}.js`,
			// chunkFilename: `js/[name].${timeStamp}.js`
			filename: `js/[name].${timeStamp}.js`,
			chunkFilename: `js/[name].${timeStamp}.js`
			
		},
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@globaleStyle', resolve('src/globaleStyle'))
            
    },
	css: {
		loaderOptions: {
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
                        selectorBlackList: ['.ignore', '.hairlines','.van','.ant'],  // (Array) The selectors to ignore and leave as px.
                        //exclude:/\/src\/pages\/homePage\//,
                        //include: [/homePage/,/components/],//匹配文件夹，当匹配中的时候编译 未匹配文件不编译,
						minPixelValue: 1,       // (Number) Set the minimum pixel value to replace.
						mediaQuery: false,       // (Boolean) Allow px to be converted in media queries.
					}),
					//require('postcss-viewport-units'),
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
