import axios from './http-default.js';
const Axios = {}
Axios.get = (url,data)=>{
    console.log('url',url)
    return axios.get(url,{
        params:data 
    })
   
}
Axios.post = (url,data)=>{
    console.log('url',url)
    return axios.post(url,data)
   
}
export default Axios;