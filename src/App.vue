<template>
    <div id="app">
        <transition  mode="out-in" :name="transitionName">
            <router-view/>
        </transition>
    </div>
</template>

<script>
export default {
    name: "app",
    data(){
        return {
            transitionName:'',
        }
    },
    watch: {
        $route (to, from) {
            if (to.meta.index > from.meta.index) {
                this.transitionName = 'slide-left'
            } else {
                this.transitionName = 'slide-right'
            }
        }
    }
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
