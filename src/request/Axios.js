import axios from './http-default.js';
/*
Axios下的函数接受多个参数
参数1 请求地址 String
参数2 请求数据 Object
参数3  请求配置 Object
  {
    beforeRequestToastType:true,//是否显示请求前toast加载框 默认显示  Boolean
    afterRequestToastType:false,//是否显示请求后请求成功 状态status === 200 toast加载框 默认不显示 Boolean
    afterRequestToastType:true,//是否显示请求后请求成功 状态 status !== 200 toast加载框提示加载错误失败原因 取message字段 默认显示 Boolean
    afterRequestToastType:true,//是否显示请求失败  toast加载框 默认显示 Boolean
  }  
*/
const Axios = {}
Axios.get = (url,data)=>{
    console.log('url',url)
    return axios.get(url,{
        params:data 
    })
   
}
Axios.post = (url,data)=>{
    
    axios.isShowToast = false;
    //console.log('axios',axios)
    return axios.post(url,data)
   
}
export default Axios;