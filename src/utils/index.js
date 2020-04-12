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
let quickSort = (list)=> {
    if (list.length < 2) { // 基线条件，当元素为空或一个时直接返回
        return list;
    } else {
        const pivot = list[0];
        let less = [];     // 对数据进行分区，所有小于 pivot 的放在 less 里面
        let greater = [];  // 所有大于 pivot 的放在 greater 里面

        for (let i = 1; i < list.length; i++) {
            const item = list[i];
            if (item <= pivot) {
                less.push(item);
            } else if (item > pivot) {
                greater.push(item);
            }
        }
        console.log(pivot)
        // 递归调用
        // 对两边分区再次分解
        return quickSort(less).concat(pivot, quickSort(greater));
    }
},
export {
    getUrlParams,
    quickSort
}