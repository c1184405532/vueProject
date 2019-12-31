<template>
    <div >
        <Button  plain type="primary" @click="gotoPage">跳转到甘特图</Button>
    </div>
</template>

<script>
import { Button } from 'vant';
export default {
    components:{
        Button,
    },
    methods:{
        gotoPage(){
            this.$router.push({path:'Gantt'})
        },
    },
}
</script>

<style>

</style>