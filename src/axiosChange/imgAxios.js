import axios from 'axios';
let instance = axios.create({
    headers: { 'Content-Type': 'multipart/form-data' }, //响应头部
    baseURL: 'http://www.liulongbin.top:3007',
    timeout: 5000,
});

instance.interceptors.request.use(config => {
    // config.data={
    //     username:'yeti',
    //     password:'123456'
    // }
    // 进入请求拦截器
    if (!config.headers["content-type"]) { // 如果没有设置请求头
        console.log(config);
        if (config.url.indexOf('/my') !== -1) {
            const tokenStr = localStorage.getItem('token');
            config.headers['Authorization'] = tokenStr
        };
        // config.headers["content-type"] = "application/x-www-form-urlencoded";
        config.headers["content-type"] = "multipart/form-data";
        console.log(config.headers["content-type"]);
        
    }
    // 执行完后，需要放行
    return config
}, err => {
    console.log(err);
})


export default instance;
