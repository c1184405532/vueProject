import axions from 'axios';
import { Toast } from 'vant';
//const basePort = 'http://192.168.8.24:8081';
const baseURL = 'http://192.168.8.97:8081';

const baseURL = '';
const instance = axions.create({
    baseURL:'https://api.github.com/users',//basePort + baseURL,
    //baseURL:baseURL,
    timeout:2000,

})
const ClearToast = Toast;
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = window.localStorage.getItem('token');
    //const token = 888
    if(token){
        config.headers[ 'X-Access-Token' ] = token;
    }
    console.log(config)
    Toast.loading({
        //message: '加载中...',
        forbidClick: true,
        duration:0,
        loadingType: 'spinner'
    });
    return config;
}, function (error) {
    //对请求错误做些什么
    console.log(error)
    return Promise.reject(error);
});
// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    //Toast('提示内容');
    ClearToast.clear();
    
    console.log('response',response)
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    ClearToast.clear();
    console.log('reserr',error)
    return false;
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
    
    
    //console.dir(error)
    return Promise.reject(error);
});
export default instance;