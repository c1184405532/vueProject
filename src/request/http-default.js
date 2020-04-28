import axions from 'axios';
import { Toast } from 'vant';
const baseClearToastTime = 1600;
const baseURL = 'http://192.168.0.104:9999';
//const baseURL = 'http://192.168.8.38:9999';

//const baseURL = '';
const instance = axions.create({
    //baseURL:'https://api.github.com/users',//basePort + baseURL,
    baseURL:baseURL,
    timeout:2000,

})
const ClearToast = Toast;
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = window.getToken() 
    //const token = 888
    if(token){
        config.headers['X-Access-Token'] = token;
    }
    //console.log('在发送请求之前做些什么',config)
    if(instance.toastConfig.beforeRequestToastType){
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration:0,
            loadingType: 'spinner'
        });
    }
    
    return config;
}, function (error) {
    //对请求错误做些什么
    console.log(error)
    return Promise.reject(error);
});
// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    //对响应数据做点什么

    //清除响应前的toast
    ClearToast.clear();
    if(instance.toastConfig.successRequestToastType && response.data.status === 200){
        Toast(response.data.message)
        setTimeout(()=>{
            ClearToast.clear();
        },baseClearToastTime)
    }
    if(instance.toastConfig.errorRequestToastType && response.data.status !== 200){
        Toast(response.data.message)
        setTimeout(()=>{
            ClearToast.clear();
        },baseClearToastTime)
    }
    //console.log('response',response)
    //console.log('instance',instance.toastConfig)
    
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    ClearToast.clear();
    //console.log('响应错误')
    //console.dir(error)
    if(error.response){
        Toast({
            message:error.response.data.message,
            duration:2500,
            icon:'warning-o'
        });  
    }else{
        Toast({
            message:error.message,
            duration:2500,
            icon:'warning-o'
        });  
    }
    return Promise.reject(error);
    let errorData = error.response.data;
    let status = error.response.status;
    switch(status){
        case 500:
            Toast({
                message:errorData.message,
                duration:2500,
                //icon:'warning-o'
            });
        break;
    }
    return Promise.reject(error);
});
export default instance;