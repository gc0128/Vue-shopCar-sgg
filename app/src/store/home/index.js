// home的小仓库
import {reqgetCategoryList,reqGetBannerList,reqFloorList} from '@/api'
const state = {
    //home仓库中存储三级菜单的数据
    categoryList:[],
    //轮播图的数据
    bannerList:[],
    //floor数据
    floorList:[]
};
//mutations是唯一修改state的地方
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    GETBANNERLIST(state,getBannerList){
        state.bannerList = getBannerList
    },
    GETFLOORLIST(state,FloorList){
        state.floorList = FloorList
    }
};
//actions用户处理派发action地方的，可以书写异步请求，自己写逻辑的地方
const actions = {
    async categoryList({commit}){
        let result = await reqgetCategoryList();
        if(result.code == 200){
            commit("CATEGORYLIST",result.data);
        }
    },
    //获取首页轮播图的数据
    async getBannerList({commit}){
       let result =  await reqGetBannerList();
       if(result.code == 200){
           commit('GETBANNERLIST',result.data);
       }
    },
    //获取Floor数据
    async getFloorList({commit}){
        let result = await reqFloorList();
        if(result.code == 200){
            commit('GETFLOORLIST',result.data);
        }
    }
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}