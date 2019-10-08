<template>
    <div>
        <div class="box" 
            ref="boxDom"
            @mousemove="boxMouseMove"
            @mousedown="boxMouseDown"
            @mouseup="boxMouseUp"   
        >
            <div class="header"
                @mousedown="mouseDown" 
                @mouseup="mouseUp"
            >
                <div class="logo">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569560850923&di=619fe812d5588688d62502ec908723fc&imgtype=0&src=http%3A%2F%2Fpic26.nipic.com%2F20121221%2F11208021_174304838000_2.jpg" alt="">
                </div>
                <div class="center">标题</div>
                <div class="right_group">
                    <div class="minimize">-</div>
                    <div class="enlarge">[]</div>
                    <div class="remove" @click="handClick">x</div>
                </div>
            </div>
        </div>
    </div>
    
</template>
<script>
export default {
    data:function(){
        return {
            isDrag:false,
            isEnlarge:false,
            mouseDownX:0,
            mouseDownY:0,
            boxDomL:0,
            boxDomT:0,
            boxWidth:0,
            boxOffSetLeft:0,
            minHeight:200,
            minWidth:200,
        }
    },
    computed:{
         
    },
    mounted:function(){
        document.onmouseup = () =>{
            this.isEnlarge = false;
            document.body.style.cursor = 'default'
            document.onmousemove = null;
            console.log('up3',this.$refs.boxDom.offsetWidth)
        }
        let list = [1, 7, 9, 8, 3, 2, 10];
        this.quickSort(list)
    },
    destroyed:function(){
        document.onmousemove = null;
        document.onmouseup = null;
    },
    methods:{
        quickSort (list) {
            if (list.length < 2) { // 基线条件，当元素为空或一个时直接返回
                return list;
            } else {
                const pivot = list[0];
                let less = [];     // 对数据进行分区，所有小于 pivot 的放在 less 里面
                let greater = [];  // 所有大于 pivot 的放在 greater 里面

                for (let i = 1; i < list.length; i++) {
                    const item = list[i];
                    if (item <= pivot) {
                        less.push(item);
                    } else if (item > pivot) {
                        greater.push(item);
                    }
                }
                console.log(pivot)
                // 递归调用
                // 对两边分区再次分解
                return this.quickSort(less).concat(pivot, this.quickSort(greater));
            }
        },
        handClick(){
            console.log(this.$refs.boxDom)
        },
        mouseDown(e){
            this.isDrag = true;
            this.mouseDownX = e.clientX;
            this.mouseDownY = e.clientY;
            this.boxDomL = this.$refs.boxDom.offsetLeft;
            this.boxDomT = this.$refs.boxDom.offsetTop;
            let fn = (ev) => {
                let e = ev || window.event;
                let mouseMoveX = e.clientX;
                let mouseMoveY = e.clientY;
                //计算移动的距离 移动时坐标减去按下时坐标
                let movingX = mouseMoveX - this.mouseDownX;
                let movingY = mouseMoveY - this.mouseDownY;
                //移动的距离加上原来的元素位置 得到最终位置
                let finishX = movingX + this.boxDomL;
                let finishY = movingY + this.boxDomT;
                if(this.isDrag){
                    requestAnimationFrame(()=>{
                        this.$refs.boxDom.style.left = finishX + 'px';
                        this.$refs.boxDom.style.top = finishY + 'px';
                    }) 
                    
                } 
                //document.onmousemove = null;
                //setTimeout(()=>{
                    document.onmousemove = fn;
                //}, 10);
            }
            fn();
           
            //console.log(this.$refs.boxDom.style)
        },
        mouseUp(){
            this.isDrag = false;
            this.mouseDownX = 0;
            this.mouseDownY = 0;
            this.boxDomL = 0;
            this.boxDomT = 0;
            document.onmousemove = null;
            //console.log('up1')
        },  
        boxMouseMove(e){
            let offsetLeft = this.$refs.boxDom.offsetLeft;
            let offsetTop = this.$refs.boxDom.offsetTop;
            let boxWidth = this.$refs.boxDom.offsetWidth;
            let boxHeight = this.$refs.boxDom.offsetHeight;
            
            //鼠标在右侧边缘
            if((boxWidth - e.clientX + offsetLeft) < 10 ){
                this.$refs.boxDom.style.cursor = 'e-resize';
                if(this.isEnlarge){
                    document.onmousemove = (ev) => {
                        let e = ev || window.event;
                        document.body.style.cursor = 'e-resize'
                        requestAnimationFrame(()=>{
                            if((e.clientX - offsetLeft) > this.minWidth){
                                //宽度===鼠标位置-偏移位置
                                this.$refs.boxDom.style.width = (e.clientX - offsetLeft) + 'px';
                            }else{
                                this.$refs.boxDom.style.width = this.minWidth + 'px';
                            }
                        }) 
                    }                  
                }
            }
            //鼠标在左侧边缘
            else if((boxWidth - e.clientX + offsetLeft) > (boxWidth - 10)){
                this.$refs.boxDom.style.cursor = 'e-resize';
                if(this.isEnlarge){
                    document.onmousemove = (ev) => {
                        let e = ev || window.event;
                        document.body.style.cursor = 'e-resize'
                        console.log(this.boxOffSetLeft  + (e.clientX - this.boxOffSetLeft))
                        requestAnimationFrame(()=>{
                            if(this.boxWidth - (e.clientX - this.boxOffSetLeft) > this.minWidth){
                                //设置改变偏移位置为 初始按下时获取的偏移位置+（鼠标当前位置-初始位置）
                                this.$refs.boxDom.style.left = this.boxOffSetLeft  + (e.clientX - this.boxOffSetLeft) + 'px';
                                //设置宽度为 初始按下时获取宽度-（鼠标位置-初始偏移位置）
                                this.$refs.boxDom.style.width = this.boxWidth - (e.clientX - this.boxOffSetLeft) + 'px';
                            }
                            
                        }) 
                    }                  
                }
            }
            //鼠标在底部边缘
            else if((boxHeight - e.clientY + offsetTop) < 10){
                this.$refs.boxDom.style.cursor = 's-resize';
                if(this.isEnlarge){
                    document.onmousemove = (ev) => {
                        let e = ev || window.event;
                        document.body.style.cursor = 's-resize'
                        requestAnimationFrame(()=>{
                            if((e.clientY - offsetTop) > this.minHeight){
                                //高度===鼠标位置-偏移位置
                                this.$refs.boxDom.style.height = (e.clientY - offsetTop) + 'px';
                            }
                            
                        }) 
                    }                  
                }
            }else{
                this.$refs.boxDom.style.cursor = 'default';
            }
            
        },
        boxMouseDown(){
            this.isEnlarge = true;
            this.boxWidth = this.$refs.boxDom.offsetWidth;
            this.boxOffSetLeft = this.$refs.boxDom.offsetLeft;
            console.log(this.boxWidth,this.boxOffSetLeft)
            //console.log('wd',this.boxWidth)
        },
        boxMouseUp(){
            this.isEnlarge = false;
            document.onmousemove = null;
        },
    }
}
</script>
<style>
    .box{
        position: absolute;
        height: 400px;
        width: 600px;
        border: 1px solid #ccc;
        background: #ddd;
        top: 20px;
        left: 20px;
        box-sizing: border-box;
    }
    .aa{
        float: right;
        height: 300px;
        width: 300px;
        background: #00f;
    }
    .header{
        height: 40px;
        width: 100%;
        display: flex;
        background: #3399FF;
        align-items: center;
        justify-content: space-between;
        cursor: move;
        user-select: none;
    }
    .logo img{
        height: 20px;
        width: 20px;
    }
    .right_group{
        display: flex;
    }
    .right_group div{
        padding: 0 10px 0 10px;
    }
    .right_group{
        cursor: pointer;
    }
</style>