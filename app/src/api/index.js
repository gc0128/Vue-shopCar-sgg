// 当前这个模块，API进行统一管理
import requests from "./request";
import mockRequests from './mock'

// 三级联动接口
// /api/product/getBaseCategoryList   get   无参数
// 发请求:axios发请求返回结果是Promise对象
export const reqgetCategoryList = () =>requests({url:'/product/getBaseCategoryList',methods:'get'});

//获取Banner(Home首页的轮播图)
export const reqGetBannerList = ()=>mockRequests.get('/banner');

//获取Floor数据
export const reqFloorList =()=>mockRequests.get('/floor');

//获取search页面的数据
export const reqGetSearchInfo =(params)=>requests({url:'/list',method:'post',data:params})

//获取详情页面数据/item/{ skuId }
export const reqGoodsInfo = (skuId)=> requests({url:`/item/${skuId}`,method:'get'})

//获取加入购物车数据
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:"post"})

//获取购物车数据
export const reqCartList = ()=>requests({url:'/cart/cartList',method:'get'})
//删除购物车商品
export const reqDeleteCartById = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})
//切换购物车商品选中状态
export const reqUpdateCheckedById = (skuId,isChecked) =>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})
 

//获取验证码
export const reqGetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

//注册用户
export const reqRegister = (data) => requests({url:'/user/passport/register',data,method:'post'})

//用户登录
export const reqUserLogin = (data) => requests({url:'/user/passport/login',data,method:'post'})

//获取用户信息
export const reqGetUserInfo = () => requests({url:'/user/passport/auth/getUserInfo',method:'get'})

//退出登录
export const reqLogout = ()=> requests({url:'/user/passport/logout',method:'get'})

//获取用户地址信息
export const reqGetUserAddress = ()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

//获取交易页面的数据
export const reqOrderInfo = ()=>requests({url:'/order/auth/trade',method:'get'})

//提交订单数据
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'});

//获取提交订单支付信息
export const reqPayInfo =(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

//查询支付状态
export const reqPayStatus = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

//获取我的订单
export const reqMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})