import axios from 'axios'
import qs from 'qs'
// 创建实例
const service = axios.create({
    baseURL: 'http://www.liulongbin.top:3007',
    timeout: 5000,
})

// 请求拦截器
service.interceptors.request.use(config => {
    // config.data={
    //     username:'yeti',
    //     password:'123456'
    // }
    // 进入请求拦截器
    if (!config.headers["content-type"]) { // 如果没有设置请求头
        if (config.url.indexOf('/my') !== -1) {
            const tokenStr = localStorage.getItem('token');
            config.headers['Authorization'] = tokenStr
        };
        if (config.method === 'post') {
            config.headers["content-type"] = "application/x-www-form-urlencoded"; // post 请求
            config.data = qs.stringify(config.data); // 序列化,比如表单数据
        } else {
            config.headers["content-type"] = "application/json"; // 默认类型
        }
    }
    // 执行完后，需要放行
    return config
}, err => {
    console.log(err);
})

// 响应拦截器
// service.interceptors.response.use(config => {
//     console.log('响应拦截器....');
//     return config
// }, err => {
//     console.log(err);
// })

export default service