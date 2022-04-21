import { reqGetCode,reqRegister,reqUserLogin,reqGetUserInfo,reqLogout} from '@/api';
import {setToken,getToken,removeToken} from '@/utils/token'
const state = {
    code: "",
    token:getToken(),
    userInfo:{}
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    //清楚本地数据【token,商品信息】
    CLEAR(state){
        //把仓库中用户相关信息清空
        state.token = ''
        state.userInfo = {}
        removeToken()
    }
}
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone);
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //用户注册
    async userRegister({commit},user){
       let result = await reqRegister(user);
       if(result.code == 200){
           console.log(result)
           return 'ok'
       }else{
           return Promise.reject(new Error('faile'))
       }
    },
    //用户登录
    async userLogin({commit},data){
        let result = await reqUserLogin(data);
        if(result.code == 200){
            commit('USERLOGIN',result.data.token)
            //持久化存储token
            setToken(result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //获取用户信息
    async getUserInfo({commit}){
        let result = await reqGetUserInfo();
        if(result.code == 200){
            commit('GETUSERINFO',result.data)
            return 'ok'
        }
        else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户退出
    async userLogout({commit}){
       let result = await reqLogout();
       if(result.code == 200){
          commit('CLEAR')
          return 'ok'
       }else{
           return Promise.reject(new Error('faile'))
       }
    },
   
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}