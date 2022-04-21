import Vue from 'vue'
import App from './App.vue'
import { MessageBox } from 'element-ui';
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入三级联动全局组件
import TypeNav from '@/components/TypeNav'
//轮播图全局组件
import Carsousel from '@/components/Carsousel'
//分页器全局组件
import Pagination from '@/components/Pagination'
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carsousel.name,Carsousel)
Vue.component(Pagination.name,Pagination)

//引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
    //懒加载默认图片
    loading:''
})

Vue.config.productionTip = false

// 引入路由
import router from './router'

//引入MockServe.js
import '@/mock/mockServe';

//引入接口app文件夹
import * as API from '@/api'

//引入swiper样式
import 'swiper/css/swiper.css';

//引入仓库
import store from './store'

//引入vee-validate表单验证
import '@/plugins/validate';

//引入自定义插件
import myPlugins from './plugins/myPlugins';
Vue.use(myPlugins,{
    name:'upper'
})

new Vue({
    render: h => h(App),
    //全局总线$bus的配置
    beforeCreate(){
        Vue.prototype.$bus = this;
        Vue.prototype.$API = API
    },
    //   注册路由
    router,
    //注册仓库,组件实例的身上会多一个$store属性
    store
}).$mount('#app')