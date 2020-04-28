<template>
    <div id="app">

        <transition  mode="out-in" :name="transitionName">
            <!--如需使用v-if方式添加缓存组件 请注释第二个keep-alive 放开第一行 放开后配置方式详见 router/home.js-->
            <!-- <keep-alive v-if="$route.meta.keepAlive"> 
                <router-view/>
            </keep-alive>  -->
            <!-- v-if="!$route.meta.keepAlive" -->
            <!-- <router-view v-if="!$route.meta.keepAlive"/> -->
            <!--如需使用当前方式缓存组件 组件内需配置name字段 详见listReveal/List 组件使用示例
                在缓存组件页面中必须配置 否则删除了之后 再次添加无响应
                beforeRouteLeave(to,from,next){
                    this.$nextTick(()=>{
                        next()
                    })
                },
                请在你的组件中使用
                window.vm.$emit('setKeepAliveData','homelistReveallist')
                删除缓存组件 
                window.vm.$emit('clearKeepAliveData','homelistReveallist')
            -->
            <keep-alive :include="keepAliveData"> 
                <router-view />
            </keep-alive>
        </transition>
    </div>
</template>

<script>
export default {
    name: "app",
    data(){
        return {
            transitionName:'',
            keepAliveData:[],
        }
    },
    
    mounted(){
        //用延时的原因是因为vue实例化在App创建之后 所以window.vm获取不到
        //使用异步把事件转换成宏任务到下一次事件队列之后执行 就获取到window.vm了
        setTimeout(()=>{
            //先off防止重复监听
            window.vm.$off('setKeepAliveData').$on('setKeepAliveData',(keepAliveName)=>{
                if(!this.keepAliveData.includes(keepAliveName)){       
                    this.keepAliveData.push(keepAliveName);
                    console.log('添加',this.keepAliveData)
                }       
            })
            window.vm.$off('clearKeepAliveData').$on('clearKeepAliveData',(keepAliveName)=>{
                let keepIndex = this.keepAliveData.indexOf(keepAliveName)
                if(keepIndex !== -1){
                    this.keepAliveData.splice(keepIndex,1)
                }
                console.log('清除',this.keepAliveData)
            })
        })
    },
    watch: {
        
        $route (to, from,next) {
            //console.log(this.$route.meta)
            if (to.meta.index > from.meta.index) {
                this.transitionName = 'slide-left'
            } else {
                this.transitionName = 'slide-right'
            } 
        }
    },
    
};

</script>

<style lang="less">
    //转场动画
    .slide-right-enter-active,
    .slide-right-leave-active,
    .slide-left-enter-active,
    .slide-left-leave-active {
        // 启用硬件加速
        will-change: transform;
        transition: all 300ms;
        position: fixed;
        
    }
    .slide-right-enter {
        transform: translate(-100%, 0);
        transition-timing-function: ease-in;
    }
    .slide-left-enter {
        transform: translate(100%, 0);
        transition-timing-function: ease-in;
    }
</style>
