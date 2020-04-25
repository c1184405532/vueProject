window.getToken = function(){
    return localStorage.getItem('userToken')
}
window.setToken = function(token){
    localStorage.setItem('userToken',token)
}
window.clearToken = function(){
    localStorage.removeItem('userToken')
}