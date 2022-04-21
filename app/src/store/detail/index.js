// detail的小仓库
import {reqGoodsInfo,reqAddOrUpdateShopCart} from '@/api';
//游客身份组件--生成一个token(唯一)
import {getUUID} from '@/utils/uuid_token'
const state = {
    goodInfo:{},
    uuid_token:getUUID()
}
//mutations是唯一修改state的地方
const mutations = {
    GETGOODSINFO(state,goodInfo){
        state.goodInfo = goodInfo
    }
}
//actions用户处理派发action地方的，可以书写异步请求，自己写逻辑的地方
const actions = {
    //获取详情页面的数据
    async getGoodsInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId);
        if(result.code == 200){
            commit('GETGOODSINFO',result.data)
        }
    },
    //将产品添加到购物车中
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        //发请求:前端带一些参数给服务器【需要存储这些数据】，存储成功了，没有给返回数据
        //不需要在三连环（仓库存储数据了）
        //注意:async函数执行返回的结果一定是一个promise【要么成功，要么失败】
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        if (result.code == 200) {
          //返回的是成功的标记
          return "ok";
        } else {
          //返回的是失败的标记
          return Promise.reject(new Error("faile"));
        }
      },
}
const getters = {
    //路径导航简化信息数据
    categoryView(state){
        return state.goodInfo.categoryView || {};
    },
    //简化产品信息的数据
    skuInfo(state){
        return state.goodInfo.skuInfo ||{};
    },
    //简化产品属性的数据
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || [];
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}