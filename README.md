# 基于vue cli3 搭建的vue模板 

## Project setup

yarn install

### Compiles and hot-reloads for development

yarn serve

### Compiles and minifies for production

yarn build


### Run your tests

npm run test


### Lints and fixes files

npm run lint

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 以下信息为项目配置

    vue.config.js下的postcss可配置vw转换 详细配置请查看 ( https://github.com/evrone/postcss-px-to-viewport )。

    main.js 导入依赖文件 设置全局Vue实例对象 此文件是入口文件 全局的配置都可在当前目录导入 如（js、css）。

    App.vue 全局父组件 vue实例化后会把里面的内容添加到静态文件index.html下。此文件可配置全局路由，进出场动画，keep-alive缓存等。

    utils/index.js 此文件配置了一些全局公共功能性函数。

    router/index.js 此文件是路由文件模块合并，然后导出在main.js中进行挂载。在里面配置了路由重复跳转防止报警告，和对回退或前进进行条件拦截
                    当window.getLocalStorage('routerIsBack')为false时进行跳转会到登录页 防止登录或退出后点击回退或前进能进入首页。
    
    router/home.js 此文件是路由模块文件 定义某个模块下的路由配置信息，用户可自己创建多个模块文件如（xx.js）然后导出，并在router/index.js中进行合并
                   就可以生效了。文件下有配置keep-alive的第二种配置可忽略。本模板用的是另一种keep-alive 如果想用第二种可以放开配置 把第一种注释禁用
                   具体使用信息请查看App.vue。

    request/http-default.js 此文件是axios实例化之后的自定义配置包含了 请求前信息提示，加载loadin框 请求后错误信息提示 请求错误重连 请求错误可配备用端口
                            以上配置均可自定义开关。配置请求端口请修改文件下baseURL。

    request/Axios.js 此文件是对配置过后的axios实例进行的封装用于请求数据。详细使用信息请进入文件查看。

    pages/user/Login.vue 登录入口 可查看请求重连测试案例（需要下载node请求文件启动，并修改http-default.就是下baseURL为你的电脑ip）
                   node.js地址( https://github.com/c1184405532/myNodeRequest )

    pages/listReveal/List.vue 列表组件使用案例 包含滚动到底加载更多 下拉刷新 keep-alive缓存 滚动位置缓存。

    pages/listReveal/Detail.vue 列表组件详情 测试滚动位置缓存。

    pages/homePage/Layout.vue app固定布局，包含navbar配置 tabbar配置 页面路由router-view 需在router/home.js Layout下的children配置路由模块。
                        （可自己修改该组件 进行你需要的配置和功能）

    pages/homePage/Home.vue app首页。

    pages/homePage/Search.vue app搜索页。

    pages/homePage/My.vue app我的页面 （以上配置页面需显示要在路由下配置跳转路由，和在Layout.vue配置tabbarData的数据，建议最多不超过五个）

    globaleStyle/globale.less 全局css配置
    
    globaleConfig/routerConfig.js 全局router配置 （暂无更改 空文件）

    globaleConfig/userMessage.js  一些全局公共函数 （请进入查看）















