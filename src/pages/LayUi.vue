<template>
    <div class="layui">
       <Button>{{urlData.data}}----{{urlData.token}}</Button>
       <a-modal title="Basic Modal" v-model="popType" @ok="handleOk" :zIndex="19891014">
            <p>用户名:{{addFriendsData.name}}</p>
            <div>
                <a-dropdown :trigger="['click']" :overlayStyle="{zIndex:19891014}">
                    <a class="ant-dropdown-link" href="#"> {{addDropTitle}} <a-icon type="down" /> </a>
                    <a-menu slot="overlay">
                        <a-menu-item :key="index" v-for="(value,index) in addFriendsData.list">
                            <p @click="sureGroup(value.groupname,value)">{{value.groupname}}</p>
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
            </div>
        </a-modal>
    </div>
</template>

<script>
import Axios from '../Axios.js';
export default {
    name: 'Home',
    components: {
        
    },
    data() {
        return {
            globalLayIm:null,
            popType:false,
            addDropTitle:'请选择好友分组',
            addFriendId:null,
            addFriendsData:{
                name:'',
                list:[
                    {
                        groupname:"前端码屌",
                        id:1,
                    }
                ],
            },
            urlData:{},
            ueseData:{},
            webSocket:null,
        }
    },
    created(){
        document.getElementsByTagName("title")[0].innerText = '我的消息';
    },
    mounted(){
        this.getData();
        // 创建layui
        
        //this.initUniAppData();
        //切换找人还是找群
        window.addSwitch = (type)=>{
            this.addFriendType = type;
            let divDom1 = document.getElementById('look_people');
            let divDom2 = document.getElementById('look_group');
            divDom2.classList.remove('head_title_default')
            divDom1.classList.remove('head_title_default')
            if(type === 'people'){
                divDom2.className = divDom2.className + " head_title_default";
                
            }else{
                divDom1.className = divDom1.className + " head_title_default";
            }
            console.log('998')
        };
        //搜索群聊或者用户id
        window.clickAddF = ()=>{
            let value = document.getElementById('add_friend').value;
            if(value){
                if(value === '123456'){
                    this.layer.msg('该用户不存在')
                    return false;
                }
                //如果是查找群
                if(this.addFriendType === 'group'){
                    this.searchGroup(value)
                    return false;
                }
                this.popType = true;
                this.addFriendsData.name = value;
            }else{
                this.layer.msg('请输入用户账号或群账号')
            }
           
            //console.log('8888',this)
        };
        //创建群聊
        window.sureAddGroup = ()=>{
            let value = document.getElementById('group_friend').value;
            if(value){
                if(window.sessionStorage.getItem('sureAddGroupId')){
                    window.sessionStorage.setItem('sureAddGroupId',window.sessionStorage.getItem('sureAddGroupId')*1+(1))
                }else{
                    window.sessionStorage.setItem('sureAddGroupId',1)
                }
                let data = {
                    type: 'group', //列表类型，只支持friend和group两种
                    avatar: "a.jpg", //群组头像
                    groupname: value, //群组名称
                    id: window.sessionStorage.getItem('sureAddGroupId')*1, //群组id
                }
                this.globalLayIm.addList(data)
                this.layer.msg('创建成功，请返回查看')
            }else{
                this.layer.msg('请输入群聊名')
            }
        }
        //创建分组
        window.sureAddFriendGroup = ()=>{
            let value = document.getElementById('add_friend_group').value;
            if(value){
               
                return false;
                if(window.sessionStorage.getItem('sureAddFriendGroup')){
                    window.sessionStorage.setItem('sureAddFriendGroup',window.sessionStorage.getItem('sureAddFriendGroup')*1+(1))
                }else{
                    window.sessionStorage.setItem('sureAddFriendGroup',1)
                }
                
                let data = {
                    type: 'friend', //列表类型，只支持friend和group两种
                    avatar: "a.jpg", //分组头像
                    groupname: value, //分组名称
                    id: window.sessionStorage.getItem('sureAddFriendGroup')*1, //分组id
                }
                this.globalLayIm.addList(data)
                this.layer.msg('创建成功，请返回查看')
            }else{
                this.layer.msg('请输入分组名')
            }
        }
        //加入群聊
        window.searchAddGroup = (data)=>{
            //let newData = JSON.parse(data);
            if(sessionStorage.getItem('searchAddData')){
                let arr = JSON.parse(sessionStorage.getItem('searchAddData'))
                arr.push(data)
                sessionStorage.setItem('searchAddData',JSON.stringify(arr))   
            }else{
                let arr = [];
                arr.push(data)
                sessionStorage.setItem('searchAddData',JSON.stringify(arr))   
            }
            this.layer.msg('已发送消息，等待对方同意')
            console.log(data)
        };
        //this.urlData = this.url(location.href);
        //console.log(this.url(location.href))
        let oldData = [
            {key:'cc'},
            {key:'bb'},
            {key:'aa'},
        ]
        let newData = [
            {key:'aa'},
            {key:'bb'},
            {key:'cc'},
            {key:'dd'}
        ]
        let finData = oldData;
        let type = false;
        if(oldData){
            for(let i=0;i<newData.length;i++){
                for(let j=0;j<oldData.length;j++){
                    if(newData[i].key == oldData[j].key ){
                        type = false;
                        break
                    }else{
                        type = true;
                    }                 
                }
                if(type){
                    finData.push(newData[i])
                }
                 console.log('type',type)
            }
           
        }
        console.log('finData',finData)
    },
    methods: {
        /*{
                        //设置我的基础信息
                        mine: {
                            "username": "佟丽娅" //我的昵称
                            ,"id": 123 //我的ID
                            ,"avatar": "http://tp4.sinaimg.cn/1345566427/180/5730976522/0" //我的头像
                        },
                        friend: [
                            {
                                "groupname":"前端码屌",
                                id:1,
                                list:[
                                    {
                                        username:'无敌大老虎2',
                                        id:888,
                                        sign:'好友签名测试数据',
                                        status:'online',
                                        a:'11',
                                        b:'33'
                                    }
                                ]
                            }
                        ], //见下文：init数据格式
                        group:[
                            {
                                groupname:'前端前端',
                                id:999,
                                avatar: "a.jpg"
                            },
                        ],
                    },*/ 
        initLayUi(){
            //return false;
            //if(window.sessionStorage.getItem('isUseLayUi') === 'true')return;
            layui.use('mobile', ()=>{
                window.sessionStorage.setItem('isUseLayUi','true')
                this.layer = layui.mobile.layer;
                let mobile = layui.mobile,layim = mobile.layim; 
                this.globalLayIm = mobile.layim;
                //基础配置
                layim.config({
                    /*init: {
                        //设置我的基础信息
                        mine: {
                            "username": "佟丽娅" //我的昵称
                            ,"id": 123 //我的ID
                            ,"avatar": "http://tp4.sinaimg.cn/1345566427/180/5730976522/0" //我的头像
                        },
                        friend: [
                            {
                                "groupname":"前端码屌",
                                id:1,
                                list:[
                                    {
                                        username:'无敌大老虎2',
                                        id:888,
                                        sign:'好友签名测试数据',
                                        status:'online',
                                        a:'11',
                                        b:'33'
                                    }
                                ]
                            }
                        ], //见下文：init数据格式
                        group:[
                            {
                                groupname:'前端前端',
                                id:999,
                                avatar: "a.jpg"
                            },
                        ],
                    },*/
                    init:this.ueseData.data.data,
                    isfriend:true,
                    isgroup:true,
                    moreList:[
                        {
                            alias: 'addFriends',
                            title: '添加好友/群',
                            //iconUnicode: '&#xe66f;', //图标字体的unicode，可不填
                            iconClass: 'layui-icon-username', //图标字体的class类名
                        },
                        {
                            alias: 'addFriendGroup',
                            title: '创建好友分组',
                            //iconUnicode: '&#xe770;', //图标字体的unicode，可不填
                            iconClass: 'layui-icon-user', //图标字体的class类名
                        },
                        {
                            alias: 'addGroup',
                            title: '创建群聊',
                            //iconUnicode: '&#xe770;', //图标字体的unicode，可不填
                            iconClass: 'layui-icon-group', //图标字体的class类名
                        },
                    

                    ],
                    copyright:true,
                });
                //创建一个会话
                // layim.chat({
                //     id: 111111
                //     ,name: '许闲心'
                //     ,type: 'kefu' //friend、group等字符，如果是group，则创建的是群聊
                //     ,avatar: 'http://tp1.sinaimg.cn/1571889140/180/40030060651/1'
                // });
                
                //layim.showNew('Group', true); //标注“群聊”新动态
                layim.on('moreList',(obj)=>{
                    switch(obj.alias){
                        case 'addFriends':
                            this.addFriends();
                            break;
                        case 'addFriendGroup':
                            this.addFriendGroup();
                            break;    
                        case 'addGroup':
                            this.addGroup();
                            break;   

                    }
                })
                //监听点击“新的朋友”
                layim.on('newFriend',()=>{
                    this.newFriend();
                })
                //添加群聊
                //this.newChat();
                //this.addLists()
                layim.on('detail',(data)=>{
                    this.seeGroup(data)
                })

                layim.on('sendMessage',(res)=>{
                    console.log('前端缓存数据',res)
                    let url = '/user/friendMsg/create';
                    if(res.to.type === 'group'){
                        url = '/group/msg/create';
                    }
                    console.log(url)
                    Axios.post(url,{
                        msgType: '0',
                        msgContent: res.mine.content,
                        uid: res.mine.id,
                        receiveId:res.to.id
                    }).then((data)=>{
                        console.log('消息发送后台',data)
                    })
                   
                })
            });
        },
        getData(){
            
            return false;
            //console.log(Axios)
             Axios.get('/index/getInitList',{
                userId:1
             }).then((res)=>{
                console.log('res',res)
                this.ueseData = res;
                this.initLayUi()
                this.connectWebSocket();
            })
            return false;
            Axios.post('/user/login/signIn',{
                pwd: "string",
                reqNo: "string",
                timeStamp: 0,
                uid: 50
            }).then((res)=>{
                console.log('res',res)
                this.ueseData = res;
                this.initLayUi()
                this.connectWebSocket();
            })
        },
        connectWebSocket(){
            if ("WebSocket" in window){
                //alert("您的浏览器支持 WebSocket!");
                // 打开一个 web socket
                this.webSocket = new WebSocket("ws://192.168.8.97:8080/LLWS");
                this.webSocket.onopen = ()=>{
                    // Web Socket 已连接上，使用 send() 方法发送数据
                    console.log("数据发送中...");
                    this.webSocket.send(JSON.stringify({
                        type:1,
                        //uid:this.ueseData.data.data.userLoginResVO.uid,
                        //sid:this.ueseData.data.data.userLoginResVO.sid
                    }));
                    //this.initLayUi();
                    
                };
                    
                this.webSocket.onmessage = (evt)=>{ 
                    let received_msg = evt;
                    let data = JSON.parse(received_msg.data);
                    this.globalLayIm.getMessage(data)
                    console.log("数据已接收...",evt);
                    console.log('数据',data)
                };
                    
                this.webSocket.onclose = ()=>{ 
                    // 关闭 websocket
                    console.log("连接已关闭..."); 
                };
            }else{
               // 浏览器不支持 WebSocket
               console("您的浏览器不支持 WebSocket!");
            }
           
        },
        
        url(url){
            var obj = {}
            try {
                var params = url.split("?")[1].split("&")
                // for (i = 0; i < params.length; i++) {
                // var param = params[i].split("=");
                // obj[param[0]] = param[1]
                // }
                params.map(v => obj[v.split("=")[0]] = v.split("=")[1])
            } catch (error) {
                
            }
            return obj;
        },
        //获取uniapp数据
        initUniAppData(){
            console.log(888)
            document.addEventListener('UniAppJSBridgeReady', function() {  
                uni.getEnv(function(res) {  
                    console.log('当前环境：' + JSON.stringify(res));  
                });  
            });
        },
        handleOk(){
            if(this.addDropTitle === '请选择好友分组'){
                this.layer.msg('请选择好友分组');
                return false;
            }
            if(window.sessionStorage.getItem('addId')*1>1){
                window.sessionStorage.setItem('addId',window.sessionStorage.getItem('addId')*1+(1))
            }else{
                window.sessionStorage.setItem('addId',10)
            }
            this.globalLayIm.addList({
                type: 'friend', //列表类型，只支持friend和group两种
                avatar: "a.jpg", //好友头像
                username: '冲田杏梨'+window.sessionStorage.getItem('addId'), //好友昵称
                groupid: this.addFriendId ,//所在的分组id
                id: window.sessionStorage.getItem('addId'), //好友id
                sign: "本人冲田杏梨将结束AV女优的工作", //好友签名
            })
            
            this.popType = false;
            this.layer.msg('创建成功，请返回查看')
        },
        //进入我的朋友界面
        newFriend(){
            let peopleData = JSON.parse(window.sessionStorage.getItem('searchAddData'))
            let str = '';
            let isAdd = '';
            /*if(peopleData.length >= 3){
                peopleData[2].type = true;
            }*/
            [{name:1,img:"11"},{name:2,img:"22"}].forEach(element => { 
                if(element.type){
                    isAdd = `<div class="search_grow">
                                <div class="search_add_btn">同意</div>
                            </div>`
                }else{
                    isAdd = `<div class="search_grow">
                                <div class="friend_type">消息已发送</div>
                            </div>`
                }
                str +=`<div class="see_group_list">
                        <img src="${element.img}" class="see_group_logo">
                        <span class="see_group_name">${element.name}</span>
                        ${isAdd}
                    </div>`
            });
            //console.log(str)
            this.panel({
                title:'新的朋友',
                tpl:`<div class="box">
                        ${str}
                    </div>`,
                data:{},
            })
        },
        newChat(){
            //自定义群聊类型
            this.globalLayIm.chat({
                name: '我的群', //名称
                type: 'group', //聊天类型
                avatar: 'http://tp1.sinaimg.cn/5619439268/180/40030060651/1', //头像
                id: 222, //定义唯一的id方便你处理信息
            });
        },
        addLists(){
            let data = {
               type: 'friend' //列表类型，只支持friend和group两种
                ,avatar: "a.jpg" //好友头像
                ,username: '冲田杏梨' //好友昵称
                ,groupid: 2 //所在的分组id
                ,id: "1233333312121212" //好友id
                ,sign: "本人冲田杏梨将结束AV女优的工作" //好友签名
            }
            this.globalLayIm.addList(data)
        },
        //进入添加好友/群界面
        addFriends(){
            this.panel({
                title:'添加好友/群',
                tpl:`<div class="add_friends">
                        <div class="add_friend_head">
                            <div class="add_friend_head_title" id="look_people" onclick="addSwitch('people')">找人</div>
                            <div class="add_friend_head_title head_title_default" id="look_group" onclick="addSwitch('group')">找群</div>
                        </div>
                        <div class="input_box" style="width:80%;margin-left:10%;">
                            <input class="layui-input" id="add_friend" placeholder="请输入用户账户或群账号"/>
                        </div>
                        <button type="button" class="layui-btn layui-btn-normal" onclick="clickAddF()" style="width: 30%;margin-right: 10%;float: right;margin-top: 50px;">查询</button>
                    </div>`,
                data:{},
            })
           
            console.log('添加好友群')
        },
        //创建群聊
        addGroup(){
             this.panel({
                title:'创建群聊',
                tpl:`<div class="add_friends">
                        <div class="input_box" style="width:80%;margin-left:10%;padding-top: 40px;">
                            <input class="layui-input" id="group_friend" placeholder="请输入群聊名"/>
                        </div>
                        <button type="button" class="layui-btn layui-btn-normal" onclick="sureAddGroup()" style="width: 30%;margin-right: 10%;float: right;margin-top: 50px;">创建群聊</button>
                    </div>`,
                data:{},
            })
          
            console.log('创建群组')
        },
        //搜索群聊
        searchGroup(value){
            let str = '';
            let searchData = [
                {name:'name1',img:'http://b-ssl.duitang.com/uploads/item/201208/30/20120830173930_PBfJE.jpeg'},
                {name:'name2',img:'http://cdn.duitang.com/uploads/item/201412/21/20141221161645_2MSeA.jpeg'},
                {name:'name3',img:'http://pic22.nipic.com/20120620/9644879_220135570113_2.jpg'}
            ]
            searchData.forEach(element =>{
                /*str +='<div class="see_group_list">'+
                        '<img src="222" class="see_group_logo">'+
                        '<span class="see_group_name">222</span>'+
                        '<div class="search_grow">'+
                            '<div class="search_add_btn" onclick="searchAddGroup('+JSON.stringify(element).replace(/\"/g,"'")+')">加入</div>'+
                        '</div>'+
                    '</div>'*/
                    str +=`<div class="see_group_list">
                            <img src="${element.img}" class="see_group_logo">
                            <span class="see_group_name">${element.name}</span>
                            <div class="search_grow">
                                <div class="search_add_btn" onclick="searchAddGroup(${JSON.stringify(element).replace(/\"/g,"'")})">加入</div>
                            </div>
                        </div>`
            })
            this.panel({
                title:'搜索结果',
                tpl:`<div>
                        ${str}
                    </div>`,
            })
        },
        //创建好友分组
        addFriendGroup(){
            this.panel({
                title:'创建分组',
                tpl:`<div class="add_friends">
                        <div class="input_box" style="width:80%;margin-left:10%;padding-top: 40px;">
                            <input class="layui-input" id="add_friend_group" placeholder="请输入分组名"/>
                        </div>
                        <button type="button" class="layui-btn layui-btn-normal" onclick="sureAddFriendGroup()" style="width: 30%;margin-right: 10%;float: right;margin-top: 50px;">创建分组</button>
                    </div>`,
                data:{},
            })
        },
        //选择分组
        sureGroup(name,value){
            this.addDropTitle = name;
            this.addFriendId = value.id
        },
        //查看群成员
        seeGroup(data){
            let peopleData = [
                {name:'name1',img:'http://b-ssl.duitang.com/uploads/item/201208/30/20120830173930_PBfJE.jpeg'},
                {name:'name2',img:'http://cdn.duitang.com/uploads/item/201412/21/20141221161645_2MSeA.jpeg'},
                {name:'name3',img:'http://pic22.nipic.com/20120620/9644879_220135570113_2.jpg'}
            ]
            let str = '';
            peopleData.forEach(element => { 
                str +=`<div class="see_group_list">
                        <img src="${element.img}" class="see_group_logo">
                        <span class="see_group_name">${element.name}</span>
                    </div>`
            });
            console.log(str)
            this.panel({
                title:'群成员',
                tpl:`<div class="box">
                        ${str}
                    </div>`,
                data:{},
            })
        },
        panel(obj){
            this.globalLayIm.panel({
                title: obj.title,
                tpl: obj.tpl,
                data:obj.data,
            });
        }
    },
    destroyed(){
        console.log('组件卸载')
        window.sessionStorage.removeItem('isUseLayUi')
    },
}
</script>
<style >
ul,li,dl,ol{
    margin: 0 !important;
}
.add_friends{
    height: 100%;
    width: 100%;
    background: #fff;
}
.add_friend_head{
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}
.add_friend_head_title{
    padding: 5px 10px 4px 10px;
    background: #bbb;
    border-radius: 14px;
    color: #222;
    font-size: 16px;
}
.head_title_default{
    background: none !important;
    color: #666 !important;
}
.search_grow{
    display: flex;
    justify-content: flex-end;
    flex-grow: 1;
}
.search_add_btn{
    height: 36px;
    line-height: 36px;
    background: #ddd;
    border-radius: 6px;
    padding: 0 10px 0 10px;
    font-size: 16px;
    margin-right: 20px;
    color: #232323;
}
.friend_type{
    height: 36px;
    line-height: 36px;
    padding: 0 10px 0 10px;
    font-size: 16px;
    margin-right: 20px;
    color: #232323;
}
.see_group_list{
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
}
.see_group_logo{
    height: 42px;
    width: 42px;
    border-radius: 50%;
    margin-left: 30px;
}
.see_group_name{
    font-size: 16px;
    margin-left: 20px;
    color: #111111;
}
</style>
<style scoped lang="scss">
</style>
