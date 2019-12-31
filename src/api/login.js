import Axions from '../Axios.js';
const getLogin = (params)=>{
    return Axions.get('',params)
}
export  {
    getLogin
}