import axios from './http-default.js';
/*
Axios下的函数接受多个参数
参数1 请求地址 String
参数2 请求数据 Object
参数3  请求配置 Object
  {
    beforeRequestToastType:true,//是否显示请求前toast加载框 默认显示  Boolean
    successRequestToastType:false,//是否显示请求后请求成功 状态status === 200 toast加载框 默认不显示 Boolean
    errorRequestToastType:true,//是否显示请求后请求成功 状态 status !== 200 toast加载框提示加载错误失败原因 取message字段 默认显示 Boolean
    afterErrorRequestToastType:true,//是否显示请求失败  toast加载框 默认显示 Boolean
  }  
*/
const Axios = {}
Axios.get = (url,data,requestToastConfig)=>{
	//console.log('url',url)
	initAxiosConfig(requestToastConfig || {})
    return axios.get(url,{
        params:data 
    })
   
}
Axios.post = (url,data,requestToastConfig)=>{
    initAxiosConfig(requestToastConfig || {})
    //console.log('axios',axios)
    return axios.post(url,data)
   
}
Axios.put = (url,data,requestToastConfig)=>{
	initAxiosConfig(requestToastConfig || {})
	//console.log('axios',axios)
	return axios.put(url,data)
}
Axios.delete = (url,data,requestToastConfig)=>{
	initAxiosConfig(requestToastConfig || {})
	//console.log('axios',axios)
	return axios.delete(url,{
		data:data
	})
}
function initAxiosConfig(requestToastConfig){
	//console.log('initAxiosConfig',requestToastConfig)
	let toastConfig = {
		afterErrorRequestToastType:true,
		beforeRequestToastType:true,
		errorRequestToastType:true,
		successRequestToastType:false,
	}
	Object.assign(toastConfig,requestToastConfig)
	axios.toastConfig = toastConfig;
	//console.log('toastConfig',toastConfig)

}
export default Axios;