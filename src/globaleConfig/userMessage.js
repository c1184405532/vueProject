window.getToken = function(){
    return localStorage.getItem('userToken')
}
window.setToken = function(token){
    localStorage.setItem('userToken',token)
}
window.removeToken = function(){
    localStorage.removeItem('userToken')
}
window.getLocalStorage = function(key){
    return JSON.parse(localStorage.getItem(key))
}
window.setLocalStorage = function(key,val){
    localStorage.setItem(key,val)
}
window.removeLocalStorage = function(key){
    localStorage.removeItem(key)
}
