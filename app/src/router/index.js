// 配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes';
//引入仓库
import store from '@/store'
// 使用插件
Vue.use(VueRouter)


// 先把VueRouter原型对象的push先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写push|replace
// 第一个参数：告诉原来push方法，你往哪里跳转
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        // call||apply区别
        // 相同：都可以调用一次函数，都可以篡改函数的上下文一次
        // 不同：call与apply传递参数，call参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,()=>{},()=>{});
    }
}
VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        // call||apply区别
        // 相同：都可以调用一次函数，都可以篡改函数的上下文一次
        // 不同：call与apply传递参数，call参数用逗号隔开，apply方法执行，传递数组
        originReplace.call(this,location,resolve,reject);
    }else{
        originReplace.call(this,location,()=>{},()=>{});
    }
}

// 配置路由
let router =  new VueRouter({
    // 配置路由
    // k:v---在k和v一致时可以省略v
    routes,
    scrollBehavior (to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        // 始终滚动到顶部
        return { y: 0 }
      }
})

router.beforeEach (async(to,from,next)=>{
    //to: 获取你要跳转到哪个路由
    //from: 获取你从哪个路由而来的信息
    //next: 放行函数
    next()
    //如果用户登录，一定会有token
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    if(token){
        //已经登录而且还想去登录------不行
     if(to.path=="/login"||to.path=='/register'){
        next('/');
     }else{
       //已经登陆了,访问的是非登录与注册
       //登录了且拥有用户信息放行
       if(name){
         next();
       }else{
         //登陆了且没有用户信息
         //在路由跳转之前获取用户信息且放行
         try {
          await store.dispatch('getUserInfo');
          next();
         } catch (error) {
           //token失效从新登录
           await store.dispatch('userLogout');
           next('/login')
         }
       }
     }
    }else{
        //未登录
        let toPath = to.path;
        if(toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') !=-1 || toPath.indexOf('/center') != -1){
            next('/login?redirect=' + toPath);
        }else{
            next()
        }
    }
})

export default router;