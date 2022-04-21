//引入路由组件
// import Home from '@/pages/Home'
// import Search from '@/pages/Search'
// import Register from '@/pages/Register'
// import Login from '@/pages/Login'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'

//二级路由组件
import MyOrder from '@/pages/Center/myOrder';
import GroupOrder from '@/pages/Center/groupOrder';

//使用了路由懒加载的方法
//路由配置信息
export default [{
        //在跳转到详情页面的时候需要带商品的id
        path: '/detail/:skuId',
        component: ()=>import('@/pages/Detail'),
        meta: {
            show: true
        }
    },
    {
        path: '/center',
        component: ()=>import('@/pages/Center'),
        name:'center',
        meta: {
            show: true
        },
        //二级路由组件
        children:[
            {
                path:'myorder',
                component:MyOrder
            },
            {
                path:'grouporder',
                component:GroupOrder
            },
            // 重定向
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
    {
        path: '/paysuccess',
        component: ()=>import('@/pages/PaySuccess'),
        name:'paysuccess',
        meta: {
            show: true
        }
    },
    {
        path: '/pay',
        component: ()=>import('@/pages/Pay'),
        name:'pay',
        meta: {
            show: true
        },
        beforeEnter:(to,from,next) => {
            if(from.path == '/trade'){
                next();
            }else{
                next(false)
            }
        }
    },
    {
        path: '/trade',
        component: ()=>import('@/pages/Trade'),
        name:'trade',
        meta: {
            show: true
        },
        beforeEnter: (to, from, next) => {
            if(from.path == '/shopcart'){
                next();
            }else{
                next(false);
            }
        }
    },
    {
        path: '/addcartsuccess',
        component: ()=>import('@/pages/AddCartSuccess'),
        name:'addcartsuccess',
        meta: {
            show: true
        }
    },
    {
        path: '/shopcart',
        component: ()=>import('@/pages/ShopCart'),
        name:'ShopCart',
        meta: {
            show: true
        }
    },
    {
        path: '/home',
        component: ()=>import('@/pages/Home'),
        meta: {
            show: true
        }
    },
    {
        path: '/search/:keyword?',
        name: "search",
        component: ()=>import('@/pages/Search'),
        meta: {
            show: true
        }
    },
    {
        path: '/register',
        component: ()=>import('@/pages/Register'),
        meta: {
            show: false
        }
    },
    {
        path: '/login',
        component: ()=>import('@/pages/Login'),
        meta: {
            show: false
        }
    },
    // 重定向
    {
        path: '*',
        redirect: '/home'
    }
]