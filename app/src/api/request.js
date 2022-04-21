// 对axios进行二次封装
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress';
// 引入进度条样式
import "nprogress/nprogress.css"

//在当前模块中引入store
import store from '@/store';

// 1. 利用axios对象的方法create去创建一个axios实例
// 2. request就是axios，需要配置一下
let requests = axios.create({
    // 配置对象
    // 基础路径，发请求的时候，路径中会出现api
    baseURL: "/api",
    // 代表请求超时的时间5s
    timeout: 5000
});
//请求拦截器----在项目中发请求（请求没有发出去）可以做一些事情
requests.interceptors.request.use((config) => {
    // console.log(config)
    //进度条开始动
    if (store.state.detail.uuid_token) {
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    if (store.state.user.token) {
        config.headers.token = store.state.user.token;
    }
    nprogress.start();
    return config;
});

//响应拦截器----当服务器手动请求之后，做出响应（相应成功）会执行的
requests.interceptors.response.use(
    (res) => {
        //进度条结束
        nprogress.done();
        //相应成功做的事情
        return res.data;
    },
    (err) => {
        alert("服务器响应数据失败");
    }
);
//最终需要对外暴露（不对外暴露外面模块没办法使用）
//这里的代码是暴露一个axios实例
export default requests;