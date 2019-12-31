let getUrlParams = ()=>{
    let obj = {}
    try {
        var params = location.href.split("?")[1].split("&")
        // for (i = 0; i < params.length; i++) {
        // var param = params[i].split("=");
        // obj[param[0]] = param[1]
        // }
        params.map(v => obj[v.split("=")[0]] = v.split("=")[1])
    } catch (error) {
        
    }
    return obj;
}
export {
    getUrlParams
}